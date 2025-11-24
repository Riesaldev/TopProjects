import { AuthService } from './auth.service';
declare class LoginDto {
    email: string;
    password: string;
}
declare class RegisterDto {
    email: string;
    password: string;
    display_name: string;
    age: number;
    gender: string;
    location: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        access_token: string;
        user: any;
    }>;
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        access_token: string;
        user: any;
    }>;
}
export {};
