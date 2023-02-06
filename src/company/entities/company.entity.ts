import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { CompanyStatus } from '../company-status.enum';
import CompanyType from '../const/companyType';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
  timestamps: true,
})
export class Company {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop()
  @Exclude()
  otp: string;

  @Prop({
    default: false,
  })
  isOtpVerified: boolean;

  @Prop({
    enum: CompanyType,
  })
  companyType: string;

  @Prop({
    enum: CompanyStatus.UNVERIFIED,
  })
  companyStatus: string;

  _id: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
