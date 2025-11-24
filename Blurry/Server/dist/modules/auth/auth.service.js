"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password_hash))) {
            if (user.is_suspended) {
                const suspensionMessage = user.suspension_until
                    ? `Cuenta suspendida hasta ${user.suspension_until.toLocaleDateString()}`
                    : 'Cuenta suspendida indefinidamente';
                throw new common_1.UnauthorizedException(`${suspensionMessage}. Razón: ${user.suspension_reason}`);
            }
            const { password_hash, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            success: true,
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }
    async register(userDto) {
        try {
            const existingEmail = await this.usersService.findByEmail(userDto.email);
            if (existingEmail) {
                throw new common_1.ConflictException('El email ya está registrado');
            }
            const existingDisplayName = await this.usersService.findByDisplayName(userDto.display_name);
            if (existingDisplayName) {
                throw new common_1.ConflictException('El nombre de usuario ya está en uso');
            }
            const hashedPassword = await bcrypt.hash(userDto.password, 10);
            const newUser = await this.usersService.create({
                email: userDto.email,
                password_hash: hashedPassword,
                role: 'user',
                display_name: userDto.display_name,
                age: userDto.age,
                gender: userDto.gender,
                location: userDto.location,
                values_profile: userDto.values_profile || {}
            });
            const { password_hash, ...userWithoutPassword } = newUser;
            return this.login(userWithoutPassword);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map