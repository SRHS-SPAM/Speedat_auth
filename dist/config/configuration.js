"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 5433,
    database: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'dmddndPs',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    smtp: {
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 456,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER || 'verify@speedat.site',
            pass: process.env.SMTP_PASSWORD || 'js9xUc!g',
        },
    },
});
//# sourceMappingURL=configuration.js.map