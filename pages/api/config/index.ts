import 'dotenv/config';

const config = {
  SECRET_KEY: 'wowthisisabadsecret12345',
  EMAIL_OPTIONS: {
    from: process.env.EMAIL_FROM || 'philip@gmail.com',
  }
}

export default config
