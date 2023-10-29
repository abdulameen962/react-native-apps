const processContact = contact => ({
    name: `${contact.name.first} ${contact.name.last}`,
    phone: contact.phone,
})

const fetchUsers = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=50&nat=us`,{
        method: 'GET'
    })
    const {results} = await response.json() 
    
    return results.map(contact => processContact(contact))

}

export const login = async (username,password) => {
    const response = await fetch('https://d2dc-129-205-124-233.ngrok-free.app',{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    })

    if (response.ok){
        const {token} = await response.json()
        return token;
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}

export default fetchUsers;