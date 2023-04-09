import { BadRequestException, Injectable } from '@nestjs/common';

import { QueryUtil } from 'src/utils';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchDto } from 'src/shared';

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

    return await this.userRepository.save(user);
  }

  async disable(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new BadRequestException('invalid-id');

    user.disabled = !user.disabled;

    return await this.userRepository.save(user);
  }
}
