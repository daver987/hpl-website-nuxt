import { Session } from '~/types/session'
import { Stripe } from 'stripe'

const YOUR_DOMAIN = useRuntimeConfig().public.WEBSITE_URL
const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default defineEventHandler(async (event) => {
  const price = await stripe.prices.create({
    product: 'prod_NFlCI4KmwNuc25',
    unit_amount: 10000,
    currency: 'cad',
  })
  const invoice = await stripe.invoices.create({
    customer: 'cus_NGN98D03DCCpwC',
    collection_method: 'send_invoice',
    days_until_due: 30,
  })
  const invoiceItem = await stripe.invoiceItems.create({
    customer: 'cus_NGN98D03DCCpwC',
    price: '{{PRICE_ID}}',
    invoice: '{{INVOICE_ID}}',
  })
  return 'Hello create-invoice'
})
