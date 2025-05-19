import { IsNotEmpty } from "class-validator";

export class ApplyCouponDto {
  @IsNotEmpty({ message: 'El código del cupon es obligatorio' })
  coupon_name: string
}