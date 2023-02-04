import { Stripe } from 'stripe'
import { Session } from '~/types/session'

const YOUR_DOMAIN = useRuntimeConfig().public.WEBSITE_URL
const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { stripeCustomerId, customerId, quoteData } = body
    let stripeCustomer = stripeCustomerId
    const quote = { ...quoteData }
    if (stripeCustomerId !== true) {
      const customer = await stripe.customers.create({
        email: body.emailAddress,
        name: `${body.firstName} ${body.lastName}`,
        phone: body.phoneNumber,
        metadata: {
          customer_id: customerId,
          quote,
        },
      })
      stripeCustomer = customer.id
      console.log('The Body:', body)
      console.log('customer info', customer)
    }

    const session = <Session>await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      mode: 'setup',
      payment_method_types: ['card'],
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      automatic_tax: { enabled: false },
      customer: stripeCustomer,
      metadata: { quote },
    })
    console.log('session info', session)

    return {
      statusCode: 200,
      url: session.url,
      stripeCustomerId: stripeCustomer,
      sessionId: session.id,
    }
    // } else {
    //   const session = <Session>await stripe.checkout.sessions.create({
    //     billing_address_collection: 'auto',
    //     mode: 'setup',
    //     payment_method_types: ['card'],
    //     success_url: `${YOUR_DOMAIN}/success`,
    //     cancel_url: `${YOUR_DOMAIN}/cancel`,
    //     automatic_tax: { enabled: false },
    //     customer: body.stripeCustomerId,
    //   })
    //   console.log('session info', session)
    //   return {
    //     statusCode: 200,
    //     url: session.url,
    //     stripeCustomerId: body.stripeCustomerId,
    //     sessionId: session.id,
    //   }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
    }
  }
})
