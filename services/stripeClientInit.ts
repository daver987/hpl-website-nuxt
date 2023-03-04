import { loadStripe } from '@stripe/stripe-js'

export async function stripeInit() {
  return await loadStripe(
    'pk_test_51LB1WyEm9nnVhePI7x5av80XBdGNV7C6jt27HgDHJ7sHQEVbzQccJwrXRT8LphTIEFSwGebIMwkGRCHoIUI2xiGU00rvazE9dK'
  )
}
