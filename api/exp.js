export const handleIncreaseExp = async (username, exp) => {
    return await fetch('/api/exp', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, exp })
    })
}

export const handleGetExp = async (username) => {
    return await fetch(`/api/exp?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}