import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(7)
    @MaxLength(20)
    @IsNotEmpty()
    userAccountName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    @IsNotEmpty()
    @IsOptional()
    userName: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    userAvatarSrc?: string;
}