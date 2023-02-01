import { Stripe } from 'stripe'

const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  const setupIntent = await stripe.setupIntents.create({
    customer: 'cus_NGN98D03DCCpwC',
    payment_method_types: ['card'],
  })
  console.log(setupIntent)
  return setupIntent
})
