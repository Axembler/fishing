import clientPromise from "@/api"

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { username, exp } = req.body

    try {
      const client = await clientPromise
      const db = client.db('fishing')

      const users = db.collection('users')
    
      const result = await users.updateOne(
        { username: username },
        { $inc: { exp: exp } }
      )

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }

      return res.status(200).json({ message: 'Опыт успешно увеличен' })
    } catch (error) {
      return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
    }
  } else if (req.method === 'GET') {
    const { username } = req.query

    try {
      const client = await clientPromise
      const db = client.db('fishing')

      const users = db.collection('users')
      
      const user = await users.findOne({ username: username }, { projection: { exp: 1 } })

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }

      return res.status(200).json({ exp: user.exp })
    } catch (error) {
      return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
    }
  } else {
    res.setHeader('Allow', ['PATCH', 'GET'])
    res.status(405).end(`Метод ${req.method} не разрешен`)
  }
}
