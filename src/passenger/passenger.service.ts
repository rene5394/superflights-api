import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { PassengerDto } from './dto/passanger.dto';

@Injectable()
export class PassengerService {

  constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger> ) {}

  async create(passengerDto: PassengerDto) {
    const newPassenger = new this.model(passengerDto);

    return await newPassenger.save();
  }

  async findAll() {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassenger[]> {
    return await this.model.findById(id);
  }

  async update(id: string, passengerDto: PassengerDto): Promise<IPassenger> {
    const passenger = { ...passengerDto }
    
    return await this.model.findByIdAndUpdate(id, passenger, { new: true })
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);

    return { status: HttpStatus.OK, msg: 'Deleted' }
  }
}
