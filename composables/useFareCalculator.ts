function useFareCalculator(baseAmount: number, roundTrip: boolean) {
  // Calculate the fuel surcharge as 8% of the base amount
  const fuelSurcharge = baseAmount * 0.08

  // Calculate the gratuity as 20% of the base amount
  const gratuity = baseAmount * 0.2

  // Calculate the subtotal without tax as the sum of the base amount, fuel surcharge, and gratuity
  const subtotalWithoutTax = baseAmount + fuelSurcharge + gratuity

  // If this is a round trip, calculate the subtotal without tax for the round trip as twice the subtotal without tax for a single trip
  const roundTripSubtotalWithoutTax = roundTrip
    ? subtotalWithoutTax * 2
    : subtotalWithoutTax

  // Calculate the tax as 13% of the base amount and fuel surcharge for the round trip
  const tax = (baseAmount + fuelSurcharge) * 0.13 * (roundTrip ? 2 : 1)

  // Calculate the total amount as the sum of the subtotal without tax for the round trip and the tax
  const totalAmount = roundTripSubtotalWithoutTax + tax

  // Round the calculated values to two decimal places using the toFixed() method
  const roundedSubtotalWithoutTax = subtotalWithoutTax.toFixed(2)
  const roundedRoundTripSubtotalWithoutTax =
    roundTripSubtotalWithoutTax.toFixed(2)
  const roundedTax = tax.toFixed(2)
  const roundedTotalAmount = totalAmount.toFixed(2)

  // Return the rounded values
  return {
    subtotalWithoutTax: roundedSubtotalWithoutTax,
    roundTripSubtotalWithoutTax: roundedRoundTripSubtotalWithoutTax,
    tax: roundedTax,
    totalAmount: roundedTotalAmount,
  }
}

export { useFareCalculator }
