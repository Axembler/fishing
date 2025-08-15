import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса buyLure. Покупка приманки lure за cash
 * */
export default async function handler(req, res) {
  const { lure, cash } = req.body

  const { db, user } = await getDbAndUser(req)

  const result = await db.collection('users').updateOne(
    { username: user.username },
    { $inc: { [`lures.${lure}`]: cash } }
  )

  if (result.modifiedCount === 0) {
    return res.status(404).json({ message: 'Пользователь не найден' })
  }

  return res.status(200).json({ message: 'Приманка куплена' })

}
