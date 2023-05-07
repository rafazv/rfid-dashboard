import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDashboardRegisterDto {
  @IsNotEmpty({ message: 'empty-rfid' })
  @MaxLength(100, { message: 'maxlength-rfid' })
  rfid: string;

  @IsNotEmpty({ message: 'empty-date' })
  createdAt: string;
}
