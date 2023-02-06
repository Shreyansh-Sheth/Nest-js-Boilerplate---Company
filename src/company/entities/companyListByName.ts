import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanySearchDocument = HydratedDocument<CompanySearch>;

@Schema({
  timestamps: true,
})
export class CompanySearch {
  @Prop()
  searchTerm: string;

  @Prop()
  name: string;

  @Prop()
  cid: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanySearch);
