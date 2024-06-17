import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(req: any, id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(req: any, id: string): Promise<void>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    generateTempPassword(body: any): Promise<void>;
}
