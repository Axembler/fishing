import jwt from 'jsonwebtoken'

export const verifyToken = (token, secret) => {
    try {
        const verified = jwt.verify(token, secret)

        return verified
    } catch (error) {
        console.error('Ошибка проверки токена:', error)
        return null
    }
}