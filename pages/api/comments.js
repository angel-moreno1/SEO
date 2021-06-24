// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const generateId = () => (Math.random() * 1000).toString().replace('.', '')

let comments = [
  {
    id: generateId(),
    text: 'a test',
    status: false
  },
  {
    id: generateId(),
    text: 'some another comment',
    status: true
  },
  {
    id: generateId(),
    text: 'this is another comment again :)',
    status: false
  }
]

export default function handler(req, res) {
  const httpMethod = req.method.toUpperCase()
  switch (httpMethod) {
    case 'GET':
      res.status(200).json(comments)
      break;
    case 'POST':
      const { text, status } = JSON.parse(req.body)
      try {
        if( text && status ) {
          const createdComment = { id: generateId(), text, status }
          comments = [createdComment, ...comments]
          res.status(201).json(createdComment)
        }
      } catch (error) {
        res.status(404).json({error: 'something went wrong'})
      } 
      break
    case 'DELETE':
      const { id } = JSON.parse(req.body)
      console.log(id)
      try {
        if(id) {
          comments = comments.filter( comment => comment.id !== id  )
          res.status(201).json({ok: true})
        }
      } catch (error) {
        res.status(404).json({error: 'something went wrong'})
      }
      break;
    default:
      res.status(400).json({ error: 'method not allowed'})
    break;
    res.status(400).json({ error: 'method not allowed'})
  }
  
}
