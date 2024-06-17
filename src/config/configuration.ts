export default () => ({
    port: parseInt(process.env.PORT, 10) || 5433,
    database: {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // 비밀번호를 문자열로 설정
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // 개발 환경에서만 사용
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'dmddndPs', //JWT secret_KEY => 응우옌
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