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

export const getInventoryLures = async () => {
    const response = await fetch('/api/lures/user', {
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

export const buyLures = async (lure, cash) => {
    const response = await fetch('/api/lures/buy', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lure, cash })
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при попытке добавления денег пользователю')
    }
  
    return response.json()
}

export const decreaseLure = async (lure) => {
    const response = await fetch('/api/lures/decrease', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lure })
    })
  
    if (!response.ok) {
      throw new Error('Ошибка при попытке отбавления денег пользователю')
    }
  
    return response.json()
}