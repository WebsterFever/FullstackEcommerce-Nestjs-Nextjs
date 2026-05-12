import { Expose } from 'class-transformer';

export class UserAdminResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  isAdmin!: string;
}
