import { stripe } from '~/server/api/services/stripeInit'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { customerId, userEmail, firstName, lastName, phoneNumber } = body

    const getCustomer = async () => {
      const customerData = await stripe.customers.search({
        query: `metadata['customer_id']:${customerId}`,
      })
      console.log('Stripe Customer:', customerData)
      const { data } = customerData
      return data
    }

    const createCustomer = async () => {
      const customer = await stripe.customers.create({
        email: userEmail,
        name: `${firstName} ${lastName}`,
        phone: phoneNumber,
        metadata: {
          customer_id: customerId,
        },
      })
      console.log('Customer:', customer)
      return customer
    }

    const stripeCustomer = async () => {
      const customer = await getCustomer()
      return customer ? customer : await createCustomer()
    }

    return await stripeCustomer()
  } catch (e) {
    return e
  }
})
