import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса getLures. Получение всех приманок
 * */
export default async function handler(req, res) {
  try {
    const { db } = await getDbAndUser(req)

    const lures = await db.collection('lures').find({}).toArray()

    res.status(200).json(lures)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}