export const getFish = async () => {
    const response = await fetch('/api/fish', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при получении данных о рыбах')
    }
  
    return response.json()
}