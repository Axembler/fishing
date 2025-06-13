export const getLures = async () => {
    const response = await fetch('/api/lures', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при получении данных о приманках')
    }
  
    return response.json()
}