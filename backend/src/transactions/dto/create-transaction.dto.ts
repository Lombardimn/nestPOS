import { Type } from "class-transformer";
import {  ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class TransactionContentsDto {
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío' })
  @IsInt({ message: 'El Producto no es válido' })
  productId: number;

  @IsNotEmpty({ message: 'Cantidad no puede estar vacía' })
  @IsInt({ message: 'La Cantidad no es válida' })
  quantity: number;

  @IsNotEmpty({ message: 'El Precio no puede estar vacío' })
  @IsNumber({}, { message: 'El Precio no es válido' })
  price: number;
}

export class CreateTransactionDto {
  @IsNotEmpty({message: 'El Total no puede estar vacio'})
  @IsNumber({}, {message: 'La Cantidad no es válida'})
  total: number

  @IsOptional()
  coupon: string

  @IsArray()
  @ArrayNotEmpty({message: 'El Contenido no pueden ir vacio'})
  @ValidateNested() /** Permite agregar subvalidaciones */
  @Type(() => TransactionContentsDto)
  contents: TransactionContentsDto[]
}