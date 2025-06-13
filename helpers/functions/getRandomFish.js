import { getRandomObject } from "./getRandomObject";

export function getRandomFish(lure, fishArray, luresArray) {
    // Находим лур, соответствующий выбранной приманке
    const selectedLure = luresArray?.find(l => l.name === lure)
    
    if (!selectedLure) {
        console.error("Приманка не найдена")

        return null // Приманка не найдена
    }

    // Фильтруем рыбы по приманке
    const filteredFish = fishArray.filter(fish => selectedLure.fishLure.includes(fish.name))

    // Проверяем, есть ли подходящие рыбы
    if (filteredFish.length === 0) {
        console.log("Нет подходящих рыб")

        return null // Нет подходящих рыб
    }

    const weightedFishArray = []

    filteredFish.forEach(fish => {
        const invertedRate = 1 / fish.rate; // Инвертируем rate
        const weight = Math.round(invertedRate * 10); // Умножаем на 10 для большей точности

        for (let i = 0; i < weight; i++) {
            weightedFishArray.push(fish)
        }
    })

    // Получаем случайную рыбу из отфильтрованного массива
    return getRandomObject(weightedFishArray)
}

// Функция для тестирования getRandomFish testGetRandomFish(lure, fishData, luresData, 1000000)
export function testGetRandomFish(lure, fishArray, luresArray, numTests) {
    const results = {}

    // Инициализируем счетчики для каждой рыбы
    fishArray.forEach(fish => {
        results[fish.name] = 0
    })

    // Выполняем выборку numTests раз
    for (let i = 0; i < numTests; i++) {
        const selectedFish = getRandomFish(lure, fishArray, luresArray)
        if (selectedFish) {
            results[selectedFish.name]++
        }
    }

    // Выводим результаты
    console.log("Результаты выборки:")
    for (const fishName in results) {
        console.log(`${fishName}: ${results[fishName]} раз ( ${(results[fishName] / numTests * 100).toFixed(2)}% )`)
    }
}