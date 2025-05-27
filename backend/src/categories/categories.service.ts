import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  /** Inserción de entidades */
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto)
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number, products?: boolean) {
    const options : FindManyOptions<Category> = {
      where: {
        id
      }
    }

    if (products) {
      options.relations = {
        products: true
      }
    }

    const category = await this.categoryRepository.findOne(options)

    if (!category) {
      throw new NotFoundException('La categoria no existe')
    }

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id)
    category.name = updateCategoryDto.name

    return await this.categoryRepository.save(category)
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    await this.categoryRepository.remove(category)

    return `La categoria ${category.name} ha sido eliminada`
  }
}
