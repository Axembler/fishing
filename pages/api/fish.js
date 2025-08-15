import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса api/fish. Получение всех рыб
 * */
export default async function handler(req, res) {
  try {
    const { db } = await getDbAndUser(req)

    const fish = await db.collection('fish').find({}).toArray()

    res.status(200).json(fish)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}