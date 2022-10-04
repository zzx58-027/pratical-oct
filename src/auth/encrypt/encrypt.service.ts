import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@Injectable()
export class EncryptService {
    async pw2bcrypt(password: string) {
        const salt = await bcrypt.genSalt();
        const result_pw = await bcrypt.hash(password, salt);
        return result_pw;
    }

    async checkPasswordByBcrypt(password: string, hashedpw: string) {
        return await bcrypt.compare(password, hashedpw);
    }
}