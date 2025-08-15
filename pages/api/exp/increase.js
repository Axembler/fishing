import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса increaseExp. Увеличение опыта на exp
 * */
export default async function handler(req, res) {
  const { exp } = req.body

  try {
    const { db, user } = await getDbAndUser(req)

    const result = await db.collection('users').updateOne(
      { username: user.username },
      { $inc: { exp: exp } }
    )

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    return res.status(200).json({ message: 'Опыт успешно увеличен' })
  } catch (error) {
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
  }
}
