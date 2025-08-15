import { getDbAndUser } from "@/helpers/db"

/**
 * Обработчик запроса getInventoryLures. Получение приманок пользователя
 * */
export default async function handler(req, res) {
  try {
    const { user } = await getDbAndUser(req)

    res.status(200).json(user.lures)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}