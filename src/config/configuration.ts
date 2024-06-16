export default () => ({
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    mail: {
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT, 10) || 456,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
  });