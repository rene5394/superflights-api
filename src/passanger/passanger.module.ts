import { Module } from '@nestjs/common';
import { PassangerService } from './passanger.service';
import { PassangerController } from './passanger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { PassangerSchema } from './schema/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => {
          return PassangerSchema;
        }
      }  
    ])
  ],
  controllers: [PassangerController],
  providers: [PassangerService]
})
export class PassangerModule {}
