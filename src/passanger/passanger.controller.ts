import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PassangerService } from './passanger.service';
import { PassangerDto } from './dto/passanger.dto';

@Controller('api/v1/passengers')
export class PassangerController {
  constructor(private readonly passangerService: PassangerService) {}

  @Post()
  create(@Body() passangerDto: PassangerDto) {
    return this.passangerService.create(passangerDto);
  }

  @Get()
  findAll() {
    return this.passangerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passangerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passangerDto: PassangerDto) {
    return this.passangerService.update(id, passangerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passangerService.delete(id);
  }
}
