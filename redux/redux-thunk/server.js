import express from 'express';
import { Low, JSONFile } from 'lowdb'

const app = express()
app.use(express.json())

const adapter = new JSONFile('db.json')
const db = new Low(adapter)
await db.read()
db.data ||= { posts: [] }

const { posts } = db.data

app.get('/title', async (req, res) => {
  const post = posts.find((p) => p.id === req.params.id)
  res.send(post)
})

app.post('/title', async (req, res, next) => {
  const post = posts.push(req.body)
  await db.write()
  res.send(post)
})

app.listen(4000, () => {
  console.log('listening on port 3000')
})