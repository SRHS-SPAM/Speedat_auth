import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updata-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User | undefined>;
    updatePasswordByEmail(email: string, password: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
