import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса getExp. Получение опыта пользователя
 * */
export default async function handler(req, res) {
  try {
    const { user } = await getDbAndUser(req)

    return res.status(200).json({ exp: user.exp })
  } catch (error) {
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
  }
}