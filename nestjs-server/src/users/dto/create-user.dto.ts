import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'empty-apto-number' })
  @MaxLength(3, { message: 'maxlength-apto-number' })
  aptoNumber: string;

  @IsNotEmpty({ message: 'empty-rfid' })
  @MaxLength(100, { message: 'maxlength-rfid' })
  rfid: string;

  @IsNotEmpty({ message: 'empty-name' })
  @MaxLength(200, { message: 'maxlength-name' })
  name: string;
}
