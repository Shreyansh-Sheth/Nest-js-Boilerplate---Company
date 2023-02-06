import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { Company } from 'src/company/entities/company.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({
    ref: Company.name,
    type: Types.ObjectId,
  })
  company: Company;

  @Prop({
    enum: Role,
  })
  role: string;

  @Prop()
  access: string[];

  @Prop({
    default: null,
  })
  forgetPasswordToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
