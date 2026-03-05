import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function generateToken(data: any, expiresIn = '7d') {
  return jwt.sign(data, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function generateInviteToken() {
  return crypto.randomBytes(32).toString('hex')
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validatePhone(phone: string) {
  const regex = /^[\d\s\-\+\(\)]{10,}$/
  return regex.test(phone.replace(/\s/g, ''))
}

export function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex')
}
