import clientPromise from "@/api"

export default async function handler(req, res) {
  const { username, password } = req.body

  try {
    const client = await clientPromise
    const db = client.db('fishing')

    const users = db.collection('users')
    const user = await users.findOne({ username: username })

    if (!user) {
      return res.status(401).json({ message: 'Неверное имя пользователя или пароль' })
    }

    const isPasswordValid = password === user.password

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверное имя пользователя или пароль' })
    }

    return res.status(200).json({ message: 'Успешно авторизован', user })
  } catch (error) {
    console.error('Error occurred:', error)
    
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
  }
}
