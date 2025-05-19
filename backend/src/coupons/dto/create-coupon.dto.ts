import { IsDateString, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateCouponDto {
  @IsNotEmpty({ message: 'El codigo del cupon es obligatorio' })
  name: string

  @IsNotEmpty({ message: 'El porcentaje del cupon es obligatorio' })
  @IsInt({ message: 'El descuento debe ser entre 1 y 100' })
  @Max(100, { message: 'El descuento maxímo es 100' })
  @Min(1, { message: 'El descuento minímo es 1' })
  percentage: number

  @IsNotEmpty({ message: 'La fecha de expiracion del cupon es obligatoria' })
  @IsDateString({}, { message: 'La fecha de expiración no es valida' })
  expirationDate: Date
}
