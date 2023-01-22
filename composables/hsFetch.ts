const baseURL = 'api.hubapi.com'
const basePath = '/crm/v3/objects'
const url = `https://${baseURL}${basePath}`

// interface for the response from the hubspot API
export interface CreateContactResponse {
  createContactResponse: {
    archived: boolean
    createdAt: string
    id: string
    properties: {
      createdate: string
      email: string
      firstname: string
      hs_all_contact_vids: string
      hs_calculated_phone_number: string
      hs_calculated_phone_number_country_code: string
      hs_email_domain: string
      hs_is_contact_unsubscribed: string
      hs_is_unworked_contact: string
      hs_lifecyclestage_lead_date: string
      hs_marketable_status: string
      hs_marketable_until_renewal: string
      hs_object_id: string
      hs_pipeline: string
      hs_searchable_calculated_phone_number: string
      lastmodifieddate: string
      lastname: string
      lifecyclestage: string
      phone: string
    }
    updatedAt: string
  }
}

export interface CreateDealResponse {
  createDealResponse: {
    archived: boolean
    createdAt: string
    id: string
    properties: {
      amount: string
      amount_in_home_currency: string
      createdate: string
      days_to_close: string
      dealname: string
      dealstage: string
      dealtype: string
      hs_all_owner_ids: string
      hs_closed_amount: string
      hs_closed_amount_in_home_currency: string
      hs_createdate: string
      hs_deal_stage_probability_shadow: string
      hs_forecast_amount: string
      hs_is_closed: string
      hs_is_closed_won: string
      hs_is_deal_split: string
      hs_lastmodifieddate: string
      hs_object_id: string
      hs_projected_amount: string
      hs_projected_amount_in_home_currency: string
      hs_user_ids_of_all_owners: string
      hubspot_owner_assigneddate: string
      hubspot_owner_id: string
      pipeline: string
    }
    updatedAt: string
  }
}

// @ts-ignore
const hsFetch = async (hsEndPoint: string, hsBody: object, secret: string) => {
  return await $fetch(url + hsEndPoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + secret,
    },
    body: hsBody,
  })
}

// const secret = useRuntimeConfig().apiSecret
// const hsFetchAssociate = (dealId: string, toObjectId: string) => {
//   return $fetch(
//     `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contact/${toObjectId}/deal_to_contact`,
//     {
//       method: 'PUT',
//       headers: {
//         authorization: 'Bearer ' + secret,
//       },
//     }
//   )
// }

export { hsFetch }
