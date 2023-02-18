export const checkUser = async () => {
	// code to check if user is new or not
	const userId = localStorage.getItem('hplUserId') ?? generateUserId()
	localStorage.setItem('hplUserId', userId)
}

export const updateUser = async (userData: any) => {
	// code to update user data
}

function generateUserId() {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	)
}
