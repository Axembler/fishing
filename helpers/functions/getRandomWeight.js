export function getRandomWeight(weight) {
    const min = weight.min;
    const max = weight.max;

    // Генерируем случайное число от 0 до 1
    const randomValue = Math.random();

    // Применяем обратное распределение
    // Чем больше значение, тем меньше вероятность его выбора
    const adjustedValue = Math.pow(1 - randomValue, 2); // Используйте степень для настройки распределения

    // Преобразуем обратно в диапазон [min, max]
    return (Math.floor(adjustedValue * (max - min)) + min) / 1000;
}
