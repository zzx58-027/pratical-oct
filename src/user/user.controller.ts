import { UserService } from "./user.service";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

    @Get("/findByUserName")
    findByUser(@Body() userName: string) {
        return this.userService.findByUserName(userName);
    }

    @Get("/findOneByUserName")
    findOneByUserName(@Body() userName) {
        return this.userService.findByUserName(userName);
    }

    @Delete("/deleteUserById/:id")
    deleteUser(@Param("id") id:string) {
        return this.userService.deleteUserById(id);
    }
    
    @Get("/findAllUsers")
    findAllUsers() {
        return this.userService.findAll();
    }
}
