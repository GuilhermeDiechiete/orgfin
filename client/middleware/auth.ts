

export const authenticated = async () => {

    const storeUser = useUserStore()
    await storeUser.show()
    
    if(storeUser.authenticated) {
        console.log('Authenticated')
    } else {
        navigateTo('auth/login')
    }
}
