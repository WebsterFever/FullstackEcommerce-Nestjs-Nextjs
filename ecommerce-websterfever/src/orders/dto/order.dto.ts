import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ProductDto {
  // Partial de Products: solo el id es necesario para identificar el producto
  @IsUUID('4', {
    message: 'El ID del producto debe ser un UUID válido',
  })
  id!: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID('4', {
    message: 'El userId debe ser un UUID válido',
  })
  userId!: string;

  @IsArray()
  @ArrayMinSize(1, {
    message: 'Debe haber al menos un producto en la orden',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products!: ProductDto[];
}
