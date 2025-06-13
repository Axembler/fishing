import clientPromise from "@/api"

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('fishing')

    const users = await db.collection('lures').find({}).toArray()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}