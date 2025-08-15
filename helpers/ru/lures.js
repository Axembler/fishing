export const translateLures = lureName => {
    const translations = {
        'worm': 'червь',
        'bread': 'хлеб',
        'corn': 'кукуруза',
        'baitfish': 'живец',
    }

    return translations[lureName] || lureName
}