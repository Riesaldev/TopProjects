import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Match } from './entities/match.entity';
import { Notification } from './entities/notification.entity';
import { Feedback } from './entities/feedback.entity';
import { Contact } from './entities/contact.entity';
import { Token } from './entities/token.entity';
import { Report } from './entities/report.entity';
import { ReportGenerated } from './entities/report-generated.entity';
import { Setting } from './entities/setting.entity';
import { ActivityLog } from './entities/activity-log.entity';
import { AdminInteraction } from './entities/admin-interaction.entity';
import { Purchase } from './entities/purchase.entity';
import { Note } from './entities/note.entity';
import { AgendaEvent } from './entities/agenda-event.entity';
import { ServiceStatus } from './entities/service-status.entity';
import { Sanction } from './entities/sanction.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'blurry',
  entities: [
    User,
    Match,
    Notification,
    Feedback,
    Contact,
    Token,
    Report,
    ReportGenerated,
    Setting,
    ActivityLog,
    AdminInteraction,
    Purchase,
    Note,
    AgendaEvent,
    ServiceStatus,
    Sanction,
  ],
  synchronize: false, // Desactivamos la sincronización automática
  logging: false,
});