import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UsersService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly mailerService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, mailerService: MailerService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    generateTempPassword(email: string): Promise<void>;
}
