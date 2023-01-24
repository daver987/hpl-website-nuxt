<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { Database } from '~/types/supabase'

const supabase = useSupabaseClient<Database>()

const {
  hplUserId,
  first_name,
  last_name,
  email_address,
  phone_number,
  stripe_customer_id,
} = storeToRefs(useUserStore())

const setIsLoading = ref(false)

async function getUserData() {
  try {
    setIsLoading.value = true
    // Get user ID from local storage
    hplUserId.value = localStorage.getItem('hplUserId')
    console.log('Hpl user id when routing to page', hplUserId.value)
    if (hplUserId.value === null || undefined) {
      localStorage.setItem('hplUserId', 'new_hpl_user')
      console.log('New User')
    } else if (hplUserId.value === 'new_hpl_user') {
      console.log('New user no quote submission')
    } else {
      let { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', hplUserId.value)
        .single()
      if (data) {
        first_name.value = data.firstName
        last_name.value = data.lastName
        email_address.value = data.emailAddress
        phone_number.value = data.phoneNumber
        stripe_customer_id.value = data.stripe_customer_id
      }
      console.log('data:', data)
      return error
    }
  } catch (error) {
    console.log('error:', error)
  } finally {
    setIsLoading.value = false
  }
}

onMounted(async () => {
  setTimeout(async () => {
    await getUserData()
  }, 2000)
})

//npx supabase gen types typescript --project-id ssnrhskkuvkhgliiywdw --schema public > types/supabase.ts
//npx supabase gen types typescript --project-id ssnrhskkuvkhgliiywdw --schema public > types.ts
</script>

<template>
  <NuxtLayout>
    <SeoKit />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
