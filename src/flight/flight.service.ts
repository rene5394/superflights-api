import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDto } from './dto/flight.dto';

@Injectable()
export class FlightService {

  constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) {}

  async create(flightDto: FlightDto): Promise<IFlight> {
    const newFlight = new this.model(flightDto);

    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id).populate('passengers');
  }

  async update(id: string, flightDto: FlightDto): Promise<IFlight> {
    const flight = { ...flightDto };

    return await this.model.findByIdAndUpdate(id, flight, { new: true })
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);

    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(flightId, {
        $addToSet: { passengers: passengerId }
      }, 
      { new: true }
    ).populate('passengers');
  }
}
