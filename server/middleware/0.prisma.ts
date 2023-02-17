import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}
prisma = new PrismaClient()

const fullName = prisma.$extends({
  result: {
    contact: {
      full_name: {
        // the dependencies
        needs: { first_name: true, last_name: true },
        compute(contact) {
          // the computation logic
          return `${contact.first_name.toUpperCase()} ${contact.last_name.toUpperCase()}`
        },
      },
    },
  },
})

export default eventHandler((event) => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  event.context.prisma = prisma
  event.context.fullName = fullName
})
