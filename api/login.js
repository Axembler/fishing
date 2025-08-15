export const login = async (username, password) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }
    
    return response.json()
}
