import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es requerido' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  name: string

  @IsNotEmpty({ message: 'El precio del producto es requerido' })
  @IsNumber({maxDecimalPlaces: 2}, { message: 'El precio del producto debe ser un número' })
  price: number

  @IsNotEmpty({ message: 'El stock del producto es requerido' })
  @IsNumber({maxDecimalPlaces: 0}, { message: 'El stock del producto debe ser un número entero' })
  stock: number

  @IsNotEmpty({ message: 'La categoria del producto es requerida' })
  @IsInt({ message: 'El ID de categoria del producto debe ser un número entero' })
  categoryId: number
}
