import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    const data = prisma.user.findMany()
    console.log(data)
    const userData = data
    return userData
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
