import { stripe } from '~/server/api/services/stripeInit'

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
