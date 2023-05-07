import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto, SearchDto } from 'src/shared';
import { DashboardRepository } from './dashboard.repository';
import { DashboardService } from './dashboard.service';
import { CreateDashboardRegisterDto } from './dto/create-dashboard-register.dto';
import { UserRepository } from 'src/users/user.repository';
import { QueryDashboardDto } from './dto/query-dashboard.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardRepository: DashboardRepository,
    private readonly dashboardService: DashboardService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get()
  async findAll(
    @Query(ValidationPipe) { page, size }: PaginationDto,
    @Query(ValidationPipe) searchQuery: QueryDashboardDto,
  ) {
    return await this.dashboardService.findAll(searchQuery, page, size);
  }

  @Post()
  async create(
    @Body(ValidationPipe)
    createDashboardRegisterDto: CreateDashboardRegisterDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { rfid: createDashboardRegisterDto.rfid },
    });

    if (!user) {
      throw new BadRequestException('rfid-not-exists');
    }

    await this.dashboardRepository.save({
      user: user,
      // createdAt: createDashboardRegisterDto.createdAt,
    });

    return { message: 'dashboard-register-created' };
  }
}
