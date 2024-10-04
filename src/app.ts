import e from 'express'

const app = e()
const port = 5000

app.get("/", (req, res) => {
  res.send("Hello Express!")
})

app.listen(port, () => {
  console.log(`Hello, express application listening on port ${port}`)
})

