import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>
  ) {}

  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto)
  }

  findAll() {
    return this.couponRepository.find()
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({ id })

    if (!coupon) {
      throw new NotFoundException('El cupon no existe')
    }

    return coupon
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id)
    Object.assign(coupon, updateCouponDto)

    return await this.couponRepository.save(coupon)
  }

  async remove(id: number) {
    const coupon = await this.findOne(id)
    await this.couponRepository.remove(coupon)

    return { message: `El cupon ${coupon.name} ha sido eliminado` }
  }

  async applyCoupon(applyCouponDto: ApplyCouponDto) {
    const coupon = await this.couponRepository.findOneBy({ name: applyCouponDto.coupon_name })

    if (!coupon) {
      throw new NotFoundException('El cupon no existe')
    }

    const currentDay = new Date()
    const expirationDate = endOfDay(coupon.expirationDate)
    
    console.log(currentDay, 'currentDay')
    console.log(expirationDate, 'expirationDate')
    
    if(isAfter(currentDay, expirationDate)) {
      throw new UnprocessableEntityException('El cupon que haz aplicado ya expiro')
    }

    return { 
      message: `El cupon ${coupon.name} ha sido aplicado`,
      ...coupon
    }
  }
}
