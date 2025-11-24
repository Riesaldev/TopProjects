import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    is_suspended?: boolean;
    suspension_reason?: string;
    suspension_until?: Date;
    bio?: string;
    interests?: string;
    imagen_perfil?: string;
    tokens?: number;
}
export {};
