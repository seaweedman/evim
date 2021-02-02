const fs = require('fs')
let listNode = null

// 读取文件目录
let fileStr = fs.readdirSync('.')
let fileArr = fileStr.toString().split(',')
let fileFmt = ''
fileArr.forEach(function(item, index) {
  if (index == 0) {
    fileFmt += "<div class='list-sel'>" + item + "</div>"
  } else {
    fileFmt += "<div>" + item + "</div>"
  }
})
document.getElementById('left').innerHTML = fileFmt

openFile('test.txt')

document.onkeydown = function(event) {
  let e = event || window.event || arguments.callee.caller.arguments[0]
  let list = document.getElementById('left')
  if (!listNode) {
    listNode = list.firstChild
  }
  switch (e.keyCode) {
    case 74: // j 下
      listNode.className = ''
      listNode.nextSibling.className = 'list-sel'
      listNode = listNode.nextSibling
      break
    case 75: // k 上
      listNode.className = ''
      listNode.previousSibling.className = 'list-sel'
      listNode = listNode.previousSibling
      break
    case 72: // h 左
      break
    case 76: // l 右
      break
    case 79: // o 打开文件
      openFile(listNode.textContent)
      break
    default:
      break
  }
}

function openFile(fileName) {
  fs.readFile(fileName, function(err, data) {
    if (err) {
      alert('error: can not read file.')
    } else {
      console.log(data.toString())
      let codeFmt = data.toString()
      document.getElementById('main-text').innerHTML = codeFmt
    }
  })
}
