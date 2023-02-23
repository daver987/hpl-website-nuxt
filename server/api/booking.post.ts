import { createCheckoutSession } from './services/stripe'
import { createCustomer, getCustomerByEmail } from './services/stripe'

const WEBSITE_URL = useRuntimeConfig().public.WEBSITE_URL

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	// Get the email and pickup date from the request body
	const newQuote = body

	try {
		// Check if the customer exists in Stripe
		let customer = await getCustomerByEmail(newQuote.user.email_address)

		if (!customer) {
			// If the customer does not exist, create a new customer
			customer = await createCustomer(newQuote)
		}

		const stripeId = customer.id

		// Create a checkout session
		const session = await createCheckoutSession(newQuote, stripeId, WEBSITE_URL)

		// Return the session ID to the client
		return { session, customer, statusCode: 200 }
	} catch (err) {
		// Handle any errors that occur
		throw err
	}
})
