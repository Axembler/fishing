export const increaseExp = async (exp) => {
    const response = await fetch('/api/exp/increase', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exp })
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при попытке повышения опыта пользователя')
    }
  
    return response.json()
}

export const getExp = async () => {
    const response = await fetch('/api/exp', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при получении данных об опыте пользователя')
    }
  
    return response.json()
}