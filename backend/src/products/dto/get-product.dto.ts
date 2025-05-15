import { IsNumberString, IsOptional } from "class-validator";

export class GetProductQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'El ID de categoria debe ser un número entero' })
  category_id?: number

  @IsOptional()
  @IsNumberString({}, { message: 'La cantidad de productos debe ser un número entero' })
  take?: number

  @IsOptional()
  @IsNumberString({}, { message: 'La pagina debe ser un número entero' })
  skip?: number
}