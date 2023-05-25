import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { QueryUtil } from 'src/utils';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchDto } from 'src/shared';

import axios from 'axios';

@Injectable()
export class UsersService {
  readonly filterColumns = [
    { column: 'name', type: 'string' },
    { column: 'rfid', type: 'string' },
    { column: 'aptoNumber', type: 'string' },
  ];

  constructor(private userRepository: UserRepository) {}

  async findAll(searchQuery: SearchDto, page = 0, size = 10) {
    const { search } = searchQuery;

    const where = QueryUtil.searchQuery(this.filterColumns, search);

    const [result, total] = await this.userRepository.findAndCount({
      where,
      skip: page * size,
      take: size,
    });

    return { result, total };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: any = {
      name: createUserDto.name,
      rfid: createUserDto.rfid,
      aptoNumber: createUserDto.aptoNumber,
    };

    const res = await axios({
      method: 'POST',
      url: process.env.ESP_URL,
      data: user,
    }).catch(() => {
      throw new ForbiddenException('ESP url is not available');
    });

    if (!res) throw new InternalServerErrorException();

    return await this.userRepository.save(user);
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: updateUserDto.id },
    });

    if (!user) throw new BadRequestException('invalid-id');

    user.name = updateUserDto.name;
    user.rfid = updateUserDto.rfid;
    user.aptoNumber = updateUserDto.aptoNumber;

    const res = await axios({
      method: 'PUT',
      url: process.env.ESP_URL,
      data: user,
    }).catch(() => {
      throw new ForbiddenException('ESP url is not available');
    });

    if (!res) throw new InternalServerErrorException();

    return await this.userRepository.save(user);
  }

  async disable(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new BadRequestException('invalid-id');

    user.disabled = !user.disabled;

    const res = await axios({
      method: 'PUT',
      url: process.env.ESP_URL,
      data: { rfid: user.rfid },
    }).catch(() => {
      throw new ForbiddenException('ESP url is not available');
    });

    if (!res) throw new InternalServerErrorException();

    return await this.userRepository.save(user);
  }

  async delete(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('not-found');

    const res = await axios({
      method: 'DELETE',
      url: process.env.ESP_URL,
      data: { rfid: user.rfid },
    }).catch(() => {
      throw new ForbiddenException('ESP url is not available');
    });

    if (!res) throw new InternalServerErrorException();

    await this.userRepository.delete(user.id);
  }
}
