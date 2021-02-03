const fs = require('fs')
const readline = require('readline')
const os = require('os')
let listNode = null
let focus = 'left'
let change = false

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
  let list = document.getElementById(focus)
  if (!listNode || change == true) {
    listNode = list.firstChild
    change = false
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
      focus = 'left'
      change = true
      break
    case 76: // l 右
      focus = 'main'
      change = true
      break
    case 79: // o 打开文件
      openFile(listNode.textContent)
      break
    default:
      break
  }
}

function openFile(fileName) {
  document.getElementById('main').innerHTML = ''
  let fRead = fs.createReadStream(fileName)

  let lines = readline.createInterface({
    input: fRead
  })

  let num = 1
  let codeFmt = ''
  lines.on('line', (line) => {
    tmp = `<span class='text-num'>${num}</span> <code>${line}</code>`
    num++

    let dom = document.createElement('div')
    dom.innerHTML = tmp
    document.getElementById('main').appendChild(dom)
  })

  /* lines.on('close', ()=>{
    document.getElementById('main').innerHTML = codeFmt
  }) */
  /* fs.readFile(fileName, function(err, data) {
    if (err) {
      alert('error: can not read file.')
    } else {
      let codeFmt = data.toString()
      document.getElementById('main').innerHTML = codeFmt
    }
  }) */
}
