import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { contact } = body
    const data = await prisma.contact.create({
      data: {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email_address: contact.email_address,
        phone_number: contact.phone_number,
      },
    })
    console.log('Create Contact Data', data)
    return data
  } catch (e) {
    console.log('Contact Error:', e)
  }
})
