import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from "./user.service";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/findAllUsers")
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get("/findByUserName")
  findByUser(@Body() userName: string) {
    return this.userService.findByUserName(userName);
  }

  @Get("/findOneByUserName")
  findOneByUserName(@Body() userName: string) {
    return this.userService.findByUserName(userName);
  }

  @Delete("/deleteUserById/:id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUserById(id);
  }

  @Post("/updateByUserId/:id")
  updateByUserId(@Body() updateUserDto: UpdateUserDto, @Param("id") id: string) {
    return this.userService.updateById(id, updateUserDto);
  }
}
