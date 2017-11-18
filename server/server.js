const path = require('path');
const express = require('express')

const publicPath = path.join(__dirname, '../public')
const app = express()
const PORT = process.env.PORT || 3000

console.log(__dirname + '/../public');
console.log(publicPath);

app.use(express.static(publicPath))

// app.get('/', (req, res) => {
//   res.render('/public/index.html')
// })

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})
