import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Matches,
  Validate,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { MatchPassword } from '../../decorators/matchPassword.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El campo no puede ir vacío' })
  @IsString()
  @MinLength(3)
  @MaxLength(80, {
    message: 'El nombre no puede tener más de 80 caracteres',
  })
  name!: string;

  @IsNotEmpty({ message: 'El campo no puede ir vacío' })
  @IsEmail()
  email!: string;

  @MinLength(8)
  @MaxLength(15)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial',
    },
  )
  @MinLength(8)
  @MaxLength(15)
  @Validate(MatchPassword, ['password'], {
    message: 'La contraseña y la confirmación de contraseña no coinciden',
  })
  confirmPassword!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address!: string;

  @IsNotEmpty()
  @IsNumber()
  phone!: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city!: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
