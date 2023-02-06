import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyModel.create({
      name: createCompanyDto.name,
      otp: createCompanyDto.otp,
      phoneNumber: createCompanyDto.phoneNumber,
      email: createCompanyDto.email,
    });
  }

  async updateCompany(updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.findOneAndUpdate(
      { _id: updateCompanyDto._id },
      { $set: updateCompanyDto },
      { new: true },
    );
  }

  async getCompanyByEmail(email: string) {
    return await this.companyModel.findOne({ email });
  }

  async getCompanyById(id: string) {
    return await this.companyModel.findOne({ _id: new Types.ObjectId(id) });
  }
}
