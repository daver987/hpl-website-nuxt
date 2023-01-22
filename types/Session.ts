export type Automatic_tax = {
  enabled: boolean
  status?: any
}

export type Custom_text = {
  shipping_address?: any
  submit?: any
}

export type Customer_details = {
  address?: any
  email: string
  name?: any
  phone?: any
  tax_exempt: string
  tax_ids?: any
}

export type Metadata = {}

export type Payment_method_options = {}

export type Phone_number_collection = {
  enabled: boolean
}

export type Total_details = {
  amount_discount: number
  amount_shipping: number
  amount_tax: number
}

export type Session = {
  id: string
  object: string
  after_expiration?: any
  allow_promotion_codes?: any
  amount_subtotal: number
  amount_total: number
  automatic_tax: Automatic_tax
  billing_address_collection: string
  cancel_url: string
  client_reference_id?: any
  consent?: any
  consent_collection?: any
  created: number
  currency: string
  custom_text: Custom_text
  customer?: any
  customer_creation: string
  customer_details: Customer_details
  customer_email: string
  expires_at: number
  livemode: boolean
  locale?: any
  metadata: Metadata
  mode: string
  payment_intent?: any
  payment_link?: any
  payment_method_collection: string
  payment_method_options: Payment_method_options
  payment_method_types: string[]
  payment_status: string
  phone_number_collection: Phone_number_collection
  recovered_from?: any
  setup_intent?: any
  shipping_address_collection?: any
  shipping_cost?: any
  shipping_details?: any
  shipping_options: any[]
  status: string
  submit_type: string
  subscription?: any
  success_url: string
  total_details: Total_details
  url: string
}
