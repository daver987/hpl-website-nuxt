export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const contactData = body
    const data = await $fetch(
      'https://hooks.zapier.com/hooks/catch/11745690/3ytqa75/',
      {
        method: 'POST',
        body: contactData,
      }
    )
    console.log('Server Contact Data:', contactData)
    console.log(body)
    return data
  } catch (e) {
    return e
  }
})
