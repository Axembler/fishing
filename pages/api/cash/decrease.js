import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса decreaseCash. Уменьшение денен пользователя на cash
 * */
export default async function handler(req, res) {
  const { cash } = req.body

  try {
    const { db, user } = await getDbAndUser(req)

    const result = await db.collection('users').updateOne(
      { username: user.username },
      { $inc: { cash: -cash } }
    )

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    return res.status(200).json({ message: 'Деньги успешно уменьшены' })
  } catch (error) {
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
  }
}
