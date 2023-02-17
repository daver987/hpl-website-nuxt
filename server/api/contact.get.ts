export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const query = getQuery(event)
    const { id: userId } = query
    const contact = await prisma.contact.findFirst()
    // const data = prisma.contact.findMany({
    //   where: {
    //     id: userId as string,
    //   },
    // })
    return contact
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
