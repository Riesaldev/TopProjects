export declare class User {
    id: number;
    email: string;
    password_hash: string;
    role: string;
    display_name: string;
    age?: number;
    gender?: string;
    location?: string;
    values_profile?: any;
    bio?: string;
    interests?: string;
    imagen_perfil?: string;
    tokens?: number;
    is_suspended: boolean;
    suspension_reason?: string;
    suspension_until?: Date;
    created_at: Date;
    updated_at: Date;
}
