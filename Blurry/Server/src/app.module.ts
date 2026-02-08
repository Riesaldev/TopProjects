import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MatchesModule } from './modules/matches/matches.module';
import { HttpModule } from '@nestjs/axios';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule, // Importa el DatabaseModule
    HttpModule,
    UsersModule,
    AuthModule,
    MatchesModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}