import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса getCash. Получение количества денег пользователя
 * */
export default async function handler(req, res) {
  try {
    const { user } = await getDbAndUser(req)

    return res.status(200).json({ cash: user.cash })
  } catch (error) {
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
  }
}
