import { EncryptService } from './../auth/encrypt/encrypt.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./user.schema";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly encryptService: EncryptService,
    ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  findByUserName(userName: string) {
    const users = this.userModel.find({userName: userName}).exec();
    return users;
  }

  async findOneById(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findOneByUserAccountName(userAccountName: string) {
    const user = await this.userModel.findOne({userAccountName: userAccountName}).exec();
    return user;
  }


  create(createUserDto: CreateUserDto) {
    const {userName, userAccountName} = createUserDto;
    if(userName === undefined) {
      createUserDto = {
        ...createUserDto,
        userName: userAccountName,
      }
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const {password} = updateUserDto;
    if(~!!password) {
      updateUserDto = {
        ...updateUserDto,
        password: await this.encryptService.pw2bcrypt(password),
      }
    }
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserDto })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async _updateUserRencentLogin(id:string) {
    const user = await this.userModel.findOneAndUpdate({_id: id}, {userRecentLogin: Date.now()}).exec();
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findOneAndDelete({_id: id}).exec();
    return user;
  }

  
}
