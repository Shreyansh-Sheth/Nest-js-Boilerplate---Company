import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { CompanyService } from 'src/company/company.service';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { MailService } from 'src/mail/mail.service';
import { UtilsService } from 'src/utils/utils.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly companyService: CompanyService,
    private readonly MailService: MailService,
    private readonly UtilsService: UtilsService,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async onBoardNewUser(createUserDto: CreateUserDto) {
    const otp = this.UtilsService.getOtp(4);
    const company = await this.companyService.create({
      name: createUserDto.companyName,
      otp: otp,
      phoneNumber: createUserDto.phoneNumber,
      email: createUserDto.email,
    });

    const userData = await this.userModel.create({
      email: createUserDto.email,
      password: createUserDto.password,
      phone: createUserDto.phoneNumber,
      company: company._id,
      role: Role.ADMIN,
    });
    await this.MailService.sendMail(
      createUserDto.email,
      'BXI OTP',
      'Your OTP is: ' + otp,
    );
    return userData;
  }
}
