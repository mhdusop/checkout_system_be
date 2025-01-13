import * as dotenv from 'dotenv';
dotenv.config();

const config = {
   APP_PORT: process.env.APP_PORT || 3000,
   USER_DB: process.env.USER_DB,
   PASSWORD_DB: process.env.PASSWORD_DB,
   PORT_DB: process.env.PORT_DB,
   NAME_DB: process.env.NAME_DB,
   JWT_SECRET: process.env.JWT_SECRET
}

export default config;