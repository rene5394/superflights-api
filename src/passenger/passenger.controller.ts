import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDto } from './dto/passanger.dto';

@Controller('api/v1/passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDto: PassengerDto) {
    return this.passengerService.create(passengerDto);
  }

  @Get()
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passengerDto: PassengerDto) {
    return this.passengerService.update(id, passengerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}
