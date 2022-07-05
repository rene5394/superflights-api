import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { PassangerDto } from './dto/passanger.dto';

@Injectable()
export class PassangerService {

  constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger> ) {}

  async create(passangerDto: PassangerDto) {
    const newPassanger = new this.model(passangerDto);

    return await newPassanger.save();
  }

  async findAll() {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassenger[]> {
    return await this.model.findById(id);
  }

  async update(id: string, passangerDto: PassangerDto): Promise<IPassenger> {
    const passanger = { ...passangerDto }
    return await this.model.findByIdAndUpdate(id, passanger, { new: true })
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);

    return { status: HttpStatus.OK, msg: 'Deleted' }
  }
}
