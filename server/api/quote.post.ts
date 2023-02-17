export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const body = await readBody(event)
  const contactData = await prisma.contact.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      email_address: body.email_address,
      phone_number: body.phone_number,
      Quote: {
        create: {
          serviceValue: body.selected_service_type_value,
          vehicleValue: body.selected_vehicle_type_value,
          Trips: {
            create: {
              distance_text: body.distance_text,
              distance_value: body.distance_value,
              duration_text: body.duration_text,
              duration_value: body.duration_value,
              passengers: body.selected_passengers,
              is_hourly: body.is_hourly,
              pickup_date: body.pickup_date,
              pickup_time: body.pickup_time,
              hours: body.selected_hours,
              locations: {
                create: [body.origin, body.destination],
              },
            },
          },
        },
      },
    },
  })

  return contactData
})
