import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import { TUser } from './1.user.inferface'
import config from '../../config'

const userSchem = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// pre save middleware/hook
userSchem.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  )
  next()
})

// post save middleware/hook
userSchem.post('save', async function () {
  // change password into * this syntax in password length
  const length = this.password.length
  this.password = Array(length).fill('*').join('')
})
export const User = model<TUser>('User', userSchem)
