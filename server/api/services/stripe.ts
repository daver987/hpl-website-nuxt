import { stripe } from '~/server/api/services/stripeInit'
import { Stripe } from 'stripe'

export interface CreateCustomerParams {
	first_name: string
	last_name: string
	email_address: string
	phone_number: string
}

export async function createCustomer(newQuote: {
	user: CreateCustomerParams
	user_id: string
}): Promise<Stripe.Customer> {
	const { first_name, last_name, email_address, phone_number } = newQuote.user
	const { user_id } = newQuote

	const customer = await stripe.customers.create({
		email: email_address,
		name: `${first_name} ${last_name}`,
		phone: phone_number,
		metadata: {
			user_id,
		},
	})

	return customer
}

export async function createCheckoutSession(
	newQuote: { user_id: string; quote_number: number },
	stripeCustomerId: string,
	WEBSITE_URL: string
): Promise<Stripe.Checkout.Session> {
	const { user_id, quote_number } = newQuote
	const session = await stripe.checkout.sessions.create({
		customer: stripeCustomerId,
		payment_method_types: ['card'],
		mode: 'setup',
		setup_intent_data: {
			metadata: {
				quote_number,
				user_id,
			},
		},
		success_url: `${WEBSITE_URL}/success?quote_number=${quote_number}`,
		cancel_url: `${WEBSITE_URL}/cancel`,
	})
	return session
}

interface GetCustomerByEmailParams {
	email: string
}

export async function getCustomerByEmail({
	email,
}: GetCustomerByEmailParams): Promise<Stripe.Customer | null> {
	const customers = await stripe.customers.list({ email: email })

	if (customers.data.length > 0) {
		return customers.data[0]
	}

	return null
}

export async function confirmPayment({
	sessionId,
	paymentMethodId,
}: ConfirmPaymentParams): Promise<any> {
	const paymentIntent = await stripe.paymentIntents.create({
		payment_method: paymentMethodId,
		payment_method_types: ['card'],
		amount: 1000,
		currency: 'cad',
		confirmation_method: 'manual',
		confirm: true,
		setup_future_usage: 'off_session',
		customer: customerId,
		metadata: {
			quote_number,
			user_id,
		},
	})

	return paymentIntent
}
