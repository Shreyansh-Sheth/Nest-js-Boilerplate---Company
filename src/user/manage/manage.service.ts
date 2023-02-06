import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Access } from 'src/auth/access.enum';
import { UtilsService } from 'src/utils/utils.service';
import { User, UserDocument } from '../entities/user.entity';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';

@Injectable()
export class ManageService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly utilsService: UtilsService,
  ) {}

  async create(createManageDto: CreateManageDto) {
    const password = this.utilsService.generateStrongPassword();
    return await this.userModel.create({
      email: createManageDto.email,
      password: password,
      company: new Types.ObjectId(createManageDto.companyId),
      access: [Access.BROWSE_PRODUCT],
    });
  }

  async findAll(companyId: string) {
    return await this.userModel.find({
      company: new Types.ObjectId(companyId),
    });
  }

  async findOne(id: string, companyId: string) {
    return await this.userModel.findOne({
      _id: new Types.ObjectId(id),
      company: new Types.ObjectId(companyId),
    });
  }

  async update(
    id: string,
    companyId: string,
    updateManageDto: UpdateManageDto,
  ) {
    return await this.userModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        company: new Types.ObjectId(companyId),
      },
      { $set: updateManageDto },
      { new: true },
    );
  }

  async remove(id: string, companyId: string) {
    return await this.userModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      company: new Types.ObjectId(companyId),
    });
  }
}
