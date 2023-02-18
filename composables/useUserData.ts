import { useStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'

export default function useUserData() {
	const userId = useStorage<string>('user_id', '')

	const checkUser = () => {
		if (userId.value) {
			return true
		} else {
			const newUserId = uuidv4()
			userId.value = newUserId.toString()
			return false
		}
	}

	return {
		userId,
		checkUser,
	}
}
