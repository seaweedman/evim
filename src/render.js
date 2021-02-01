const fs = require('fs')
const root = fs.readdirSync('.')
console.log(root)
document.getElementById('left').innerHTML = root

fs.readFile('test.txt', function(err, data) {
  if (err) {
    alert('error: can not read file.')
  } else {
    document.getElementById('main').innerHTML = data.toString()
  }
})
