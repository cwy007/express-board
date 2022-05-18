const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './templates')

app.use(bodyParser())

const messages = []

app.get('/', (req, resp) => {
  resp.render('index', { messages })
})

app.route('/publish')
  .get((req, resp) => {
    resp.render('publish')
  })
  .post((req, resp) => {
    if (!req.body.name || !req.body.content) {
      throw new Error('请将所有选项填写完整')
    }
    const now = (new Date()).toLocaleString();
    messages.push({
      name: req.body.name,
      content: req.body.content,
      time: now,
    })
    resp.redirect('/')
  })

app.listen(8080, () => {
  console.log('listen on 8080')
})
