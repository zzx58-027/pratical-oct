import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    @IsNotEmpty()
    @IsOptional()
    userName: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    @IsOptional()
    password: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    userAvatarSrc: string;
}