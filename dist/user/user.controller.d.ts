import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './Dto/user.types';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(userData: UserDto, res: any): Promise<any>;
    user(userId: string): Promise<any>;
    update(userId: string, data: UpdateUserDto): Promise<any>;
}
