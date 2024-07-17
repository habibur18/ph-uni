import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
}
