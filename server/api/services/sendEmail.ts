import { format } from 'date-fns'

interface EmailData {
	first_name: string
	last_name: string
	email_address: string
	phone_number: string
	round_trip_total: string
	total_fare: string
	vehicle_label: string
	service_label: string
	is_round_trip: boolean
	pickup_date: string
	pickup_time: string
	return_date: string | undefined
	return_time: string | undefined
	quote_number: number
	origin_formatted_address: string
	destination_formatted_address: string
	vehicle_image: { vehicle_image: string }
	visibility: string
}

export const sendEmail = async (
	zapierSecret: string,
	newQuote: any
): Promise<void> => {
	const total_price = newQuote.total_price
	const return_total_price = newQuote.total_price * 2
	const body: EmailData = {
		first_name: newQuote.user.first_name,
		last_name: newQuote.user.last_name,
		email_address: newQuote.user.email_address,
		phone_number: newQuote.user.phone_number,
		total_fare: total_price.toFixed(2),
		round_trip_total: return_total_price.toFixed(2),
		vehicle_label: newQuote.vehicle.label,
		service_label: newQuote.service.label,
		is_round_trip: newQuote.is_round_trip,
		pickup_date: format(new Date(newQuote.pickup_date), 'MMMM dd, yyyy'),
		pickup_time: format(new Date(newQuote.pickup_time), 'hh:mm a'),
		return_date: format(new Date(newQuote.return_date), 'MMMM dd, yyyy'),
		return_time: format(new Date(newQuote.return_time), 'hh:mm a'),
		quote_number: newQuote.quote_number,
		origin_formatted_address: newQuote.trips[0].origin_full_name,
		destination_formatted_address: newQuote.trips[0].destination_full_name,
		vehicle_image: newQuote.vehicle.vehicle_image,
		visibility: newQuote.is_round_trip
			? 'visibility: visible;'
			: 'visibility: hidden;',
	}

	const response = await fetch(zapierSecret, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})

	if (response.ok) {
		const data = await response.json()
		console.log('This is the returned email data', data)
	} else {
		console.error(`Error sending email: ${response.statusText}`)
	}
}
