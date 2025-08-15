import clientPromise from "@/api"
import { parseCookie, verifyToken } from "@/helpers/functions"

export const getDbAndUser = async (req) => {
  const client = await clientPromise
  const db = client.db('fishing')

  const cookie = req.headers.cookie
  const decodedCookie = verifyToken(parseCookie(cookie).token, 'your_secret_key')

  if (!decodedCookie) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const users = db.collection('users')
  const user = await users.findOne({ username: decodedCookie.username })

  if (!user) {
    res.status(404).json({ error: 'User not found' })
  }

  return { db, user }
}