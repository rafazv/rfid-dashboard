import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Not } from 'typeorm';
import { EntityIdDto, PaginationDto, SearchDto } from 'src/shared';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(
    @Query(ValidationPipe) { page, size }: PaginationDto,
    @Query(ValidationPipe) searchQuery: SearchDto,
  ) {
    return await this.usersService.findAll(searchQuery, page, size);
  }

  @Get('/:id')
  async findOne(@Param(ValidationPipe) { id }: EntityIdDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('not-found');

    return user;
  }

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    if (
      await this.userRepository.findOne({ where: { rfid: createUserDto.rfid } })
    ) {
      throw new BadRequestException('rfid-exists');
    }

    const user = await this.usersService.create(createUserDto);

    const { id } = user;

    return { message: 'user-created', id };
  }

  @Put()
  async update(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    if (
      await this.userRepository.findOne({
        where: {
          id: Not(updateUserDto.id),
          rfid: updateUserDto.rfid,
        },
      })
    ) {
      throw new BadRequestException('rfid-exists');
    }

    await this.usersService.update(updateUserDto);

    return { message: 'user-updated' };
  }

  @Put('/disable/:id')
  async disable(@Param(ValidationPipe) { id }: EntityIdDto) {
    await this.usersService.disable(id);

    return { message: 'user-disabled' };
  }

  @Delete('/:id')
  async delete(@Param(ValidationPipe) { id }: EntityIdDto) {
    await this.usersService.delete(id);

    return { message: 'user-deleted' };
  }
}
