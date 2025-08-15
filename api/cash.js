export const increaseCash = async (cash) => {
    const response = await fetch('/api/cash/increase', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cash })
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при попытке добавления денег пользователю')
    }
  
    return response.json()
}

export const decreaseCash = async (cash) => {
    const response = await fetch('/api/cash/decrease', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cash })
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при попытке уменьшения денег пользователю')
    }
  
    return response.json()
}

export const getCash = async () => {
    const response = await fetch('/api/cash', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при получении данных о деньгах пользователя')
    }
  
    return response.json()
}