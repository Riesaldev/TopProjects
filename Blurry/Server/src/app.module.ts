import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MatchesModule } from './modules/matches/matches.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ActivityLogsModule } from './modules/activity-logs/activity-logs.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ReportsGeneratedModule } from './modules/reports-generated/reports-generated.module';
import { AdminInteractionsModule } from './modules/admin-interactions/admin-interactions.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { NotesModule } from './modules/notes/notes.module';
import { AgendaModule } from './modules/agenda/agenda.module';
import { ServicesModule } from './modules/services/services.module';
import { SanctionsModule } from './modules/sanctions/sanctions.module';
import { GamesModule } from './modules/games/games.module';
import { ProductsModule } from './modules/products/products.module';
import { ChatsModule } from './modules/chats/chats.module';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { MissionsModule } from './modules/missions/missions.module';
import { StreaksModule } from './modules/streaks/streaks.module';
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
    SettingsModule,
    ActivityLogsModule,
    NotificationsModule,
    FeedbackModule,
    TokensModule,
    ReportsModule,
    ReportsGeneratedModule,
    AdminInteractionsModule,
    PurchasesModule,
    NotesModule,
    AgendaModule,
    ServicesModule,
    SanctionsModule,
    GamesModule,
    ProductsModule,
    ChatsModule,
    AchievementsModule,
    MissionsModule,
    StreaksModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}