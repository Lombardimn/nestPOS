import { BadRequestException, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class IdValidationPipe extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () => new BadRequestException('El id no es valido, debe ser un número')
    })
  }
}
