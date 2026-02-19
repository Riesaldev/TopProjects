# RollForge Server

Express + Socket.io REST API for the RollForge TTRPG platform.

## Stack

- **Runtime**: Node.js + TypeScript (NodeNext modules)
- **Framework**: Express 5
- **Database**: MySQL 8 via `mysql2`
- **Auth**: JWT (`jsonwebtoken`) + bcrypt
- **Realtime**: Socket.io
- **Validation**: Zod
- **Email**: Nodemailer

## Setup

```bash
# 1. Install dependencies
cd server
npm install   # or pnpm install

# 2. Configure environment
cp .env.example .env
# Edit .env — fill in DB credentials, JWT secret, SMTP settings

# 3. Create the database
mysql -u root -p < schema.sql

# 4. Start development server
npm run dev   # runs on http://localhost:3001
```

## Project Structure

```
server/
├── schema.sql              # Database schema (run once)
├── .env.example            # Environment variable template
└── src/
    ├── index.ts            # App bootstrap + Socket.io
    ├── config/
    │   ├── database.ts     # MySQL pool
    │   └── environment.ts  # Zod-validated env vars
    ├── types/
    │   └── entities.ts     # DB row TypeScript interfaces
    ├── middlewares/
    │   ├── auth.middleware.ts   # JWT authenticate / requireRole
    │   └── errorHandler.ts     # Global error handler + AppError
    ├── utils/
    │   └── schemas.ts      # Zod request validation schemas
    ├── controllers/
    │   ├── authController.ts
    │   ├── campaignController.ts
    │   ├── characterController.ts
    │   └── resourceController.ts
    └── routes/
        ├── index.ts        # Mounts all route groups under /api
        ├── auth.ts
        ├── campaigns.ts
        ├── characters.ts
        └── resources.ts
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | ✗ | Login |
| POST | `/api/auth/register` | ✗ | Register |
| POST | `/api/auth/recover-password` | ✗ | Request password reset email |
| POST | `/api/auth/reset-password` | ✗ | Reset password with token |
| GET | `/api/auth/me` | ✓ | Get current user |
| GET | `/api/campaigns` | ✓ | List own + joined campaigns |
| POST | `/api/campaigns` | ✓ | Create campaign |
| GET | `/api/campaigns/:id` | ✓ | Get campaign |
| PATCH | `/api/campaigns/:id` | ✓ | Update campaign (owner only) |
| DELETE | `/api/campaigns/:id` | ✓ | Delete campaign (owner only) |
| GET | `/api/characters[?campaign_id=X]` | ✓ | List own characters |
| POST | `/api/characters` | ✓ | Create character |
| GET | `/api/characters/:id` | ✓ | Get character |
| PATCH | `/api/characters/:id` | ✓ | Update character |
| DELETE | `/api/characters/:id` | ✓ | Delete character |
| GET | `/api/resources?campaign_id=X[&type=Y]` | ✓ | List campaign resources |
| POST | `/api/resources` | ✓ | Upload resource (multipart/form-data) |
| DELETE | `/api/resources/:id` | ✓ | Delete resource |
| GET | `/health` | ✗ | Health check |

## Socket.io Events

| Event (emit) | Payload | Description |
|---|---|---|
| `join:campaign` | `campaignId` | Join campaign room |
| `leave:campaign` | `campaignId` | Leave campaign room |
| `dice:roll` | `{ campaign_id, roll, result }` | Broadcast dice roll |
| `dice:result` | `{ campaign_id, roll, result, user_id }` | Received by all in room |
