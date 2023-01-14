import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './Dto/user.types';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(userData: UserDto): Promise<any>;
    user(userId: string, res: any): Promise<any>;
    update(userId: string, data: UpdateUserDto): Promise<any>;
}
