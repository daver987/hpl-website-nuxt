export interface StripeResponse {
  clientSecret: string
}

export interface ConfirmCardPaymentPayload {
  paymentMethodId: string
  clientSecret: string
}

export interface CustomerPayload {
  name: string
  email: string
  paymentMethodId: string
}

export interface SubscriptionPayload {
  customerId: string
  priceId: string
}

export function useStripe() {
  // const { $stripeServer } = useNuxtApp()
  // const stripe = computed(() => $stripeServer)

  const createPaymentIntent = async ({
    amount,
    currency,
  }: {
    amount: number
    currency: string
  }): Promise<string> => {
    try {
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency }),
      })
      const data: StripeResponse = await response.json()
      return data.clientSecret
    } catch (error) {
      console.error(error)
    }
  }

  const confirmCardPayment = async ({
    paymentMethodId,
    clientSecret,
  }: ConfirmCardPaymentPayload): Promise<any> => {
    try {
      const response = await fetch('/api/payments/confirm-card-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId, clientSecret }),
      })
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  const createCustomer = async ({
    name,
    email,
    paymentMethodId,
  }: CustomerPayload): Promise<string> => {
    try {
      const customer = await stripe.value.customers.create({
        name,
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      })
      return customer.id
    } catch (error) {
      console.error(error)
    }
  }

  const createSubscription = async ({
    customerId,
    priceId,
  }: SubscriptionPayload): Promise<string> => {
    try {
      const subscription = await stripe.value.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
      })
      return subscription.id
    } catch (error) {
      console.error(error)
    }
  }

  const createSetupIntent = async ({
    paymentMethodId,
  }: {
    paymentMethodId: string
  }): Promise<string> => {
    try {
      const setupIntent = await stripe.value.setupIntents.create({
        payment_method: paymentMethodId,
      })
      return setupIntent.client_secret
    } catch (error) {
      console.error(error)
    }
  }

  return {
    stripe,
    createPaymentIntent,
    confirmCardPayment,
    createCustomer,
    createSubscription,
    createSetupIntent,
  }
}
