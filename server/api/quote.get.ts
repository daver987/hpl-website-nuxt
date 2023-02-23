import { useToNumber } from '@vueuse/core'

export default defineEventHandler(async (event) => {
	const prisma = event.context.prisma
	const query = getQuery(event)
	const quote_number = useToNumber(query.quote_number as string)
	try {
		const data = await prisma.quote.findUnique({
			where: { quote_number: quote_number.value },
			include: {
				user: true,
				trips: true,
				service: true,
				vehicle: true,
			},
		})
		if (data) {
			const quote = data
			return quote
		} else {
			console.log('No data found')
			return 'No data found'
		}
	} catch (error) {
		console.log('Get Quote Error:', error)
		return error
	}
})
