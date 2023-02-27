import { useStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'

export default function useUserData() {
  const user_id = useStorage<string>('user_id', '')

  const checkUser = () => {
    if (user_id.value) {
      return true
    } else {
      const newUserId = uuidv4()
      user_id.value = newUserId.toString()
      return false
    }
  }

  return {
    user_id,
    checkUser,
  }
}
