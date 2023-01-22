export type Tip = {}

export type Amount_details = {
  tip: Tip
}

export type Metadata = {}

export type Card = {
  installments?: any
  mandate_options?: any
  network?: any
  request_three_d_secure: string
}

export type Payment_method_options = {
  card: Card
}

export type Address = {
  city: string
  country: string
  line1: string
  line2?: any
  postal_code: string
  state: string
}

export type Shipping = {
  address: Address
  carrier?: any
  name: string
  phone?: any
  tracking_number?: any
}

export type Object = {
  id: string
  object: string
  amount: number
  amount_capturable: number
  amount_details: Amount_details
  amount_received: number
  application?: any
  application_fee_amount?: any
  automatic_payment_methods?: any
  canceled_at?: any
  cancellation_reason?: any
  capture_method: string
  client_secret: string
  confirmation_method: string
  created: number
  currency: string
  customer?: any
  description: string
  invoice?: any
  last_payment_error?: any
  latest_charge?: any
  livemode: boolean
  metadata: Metadata
  next_action?: any
  on_behalf_of?: any
  payment_method?: any
  payment_method_options: Payment_method_options
  payment_method_types: string[]
  processing?: any
  receipt_email?: any
  review?: any
  setup_future_usage?: any
  shipping: Shipping
  source?: any
  statement_descriptor?: any
  statement_descriptor_suffix?: any
  status: string
  transfer_data?: any
  transfer_group?: any
}

export type Data = {
  object: Object
}

export type Request = {
  id: string
  idempotency_key: string
}

export type StripeResponse = {
  id: string
  object: string
  api_version: string
  created: number
  data: Data
  livemode: boolean
  pending_webhooks: number
  request: Request
  type: string
}
