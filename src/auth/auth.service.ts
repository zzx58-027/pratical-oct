import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './../user/dto/update-user.dto';
import { EncryptService } from './encrypt/encrypt.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly encryptService: EncryptService,
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        const {userAccountName, password}  = createUserDto;
        const userIf = await this.userService.findOneByUserAccountName(userAccountName);
        if(userIf) throw new ConflictException("该用户已注册");
        createUserDto = {
            ...createUserDto,
            password: await this.encryptService.pw2bcrypt(password),
        }
        await this.userService.create(createUserDto);
        return '用户注册成功'
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const {userAccountName, password} = authCredentialsDto;
        const user = await this.userService.findOneByUserAccountName(userAccountName);
        if(user) {
            const compared_result = await this.encryptService.checkPasswordByBcrypt(password, user.password);
            if(compared_result) {
                const userNow = await this.userService._updateUserRencentLogin(user.id);
                return userNow;
            } else {
                throw new NotFoundException("密码输入错误");
            }
        } else {
            throw new NotFoundException("用户不存在");
        }
    }
}
