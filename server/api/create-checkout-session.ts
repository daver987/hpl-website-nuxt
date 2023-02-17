import { stripe } from '~/server/api/services/stripeInit'

const YOUR_DOMAIN = useRuntimeConfig().public.WEBSITE_URL
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { stripeCustomerId, quoteData } = body
    const quote = { ...quoteData }
    console.log('quote', quote)
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      mode: 'setup',
      payment_method_types: ['card'],
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      automatic_tax: { enabled: false },
      customer: stripeCustomerId,
      metadata: { quote },
    })
    console.log('session info', session)

    return {
      statusCode: 200,
      url: session.url,
      stripeCustomerId: stripeCustomerId,
      sessionId: session.id,
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
    }
  }
})
