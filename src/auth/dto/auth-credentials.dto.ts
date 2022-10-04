import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(7)
    @MaxLength(20)
    @IsNotEmpty()
    userAccountName: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    password: string;
}