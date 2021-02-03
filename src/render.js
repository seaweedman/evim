const fs = require('fs')
const readline = require('readline')
const os = require('os')
const keyMap = {
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z'
}

let listNode = null
let focus = 'left'
let change = false
let listLeft = null
let newLine = false

// 0 普通模式 1 插入模式
let status = 0

openMenu()
openFile()

// 按键监听
document.onkeydown = function(e) {
  let keyCode = e.keyCode || e.which || e.charCode
  let ctrlKey = e.ctrlKey || e.metaKey
  let altKey = e.altKey

  // 记录行
  let list = document.getElementById(focus)
  if (!listNode || change == true) {
    listNode = list.firstChild
    change = false
  }

  if (status == 1) {
    insert(keyCode, altKey, ctrlKey)
  } else {
    normal(keyCode, altKey, ctrlKey)
  }
}

function insert(keyCode, altKey, ctrlKey) {
  if (keyCode == 27) {
    status = 0
    document.getElementById('status').innerHTML = 'NORMAL'
    return
  }

  let text = keyMap[keyCode]
  let dom = document.createElement('ee')
  dom.innerHTML = text
  listLeft.parentNode.appendChild(dom)
}

function normal(keyCode, altKey, ctrlKey) {
  if (altKey) {
    switch (keyCode) {
      case 72: // h 左
        focus = 'left'
        change = true
        break
      case 76: // l 右
        focus = 'main'
        change = true
        break
      default:
        break
    }
  } else {
    switch (keyCode) {
      case 74: // j 下
        listNode.className = ''
        listNode.nextSibling.className = 'list-sel'

        if (focus == 'main') {
          if (listNode.lastChild.firstChild) {
            listNode.lastChild.firstChild.className = ''
          }
          if (listNode.nextSibling.lastChild.firstChild) {
            listNode.nextSibling.lastChild.firstChild.className = 'code-sel'
          }

          listLeft = listNode.nextSibling.lastChild.firstChild
        }

        listNode = listNode.nextSibling
        break
      case 75: // k 上
        listNode.className = ''
        listNode.previousSibling.className = 'list-sel'

        if (focus == 'main') {
          if (listNode.lastChild.firstChild) {
            listNode.lastChild.firstChild.className = ''
          }
          if (listNode.previousSibling.lastChild.firstChild) {
            listNode.previousSibling.lastChild.firstChild.className = 'code-sel'
          }

          listLeft = listNode.previousSibling.lastChild.firstChild
        }

        listNode = listNode.previousSibling
        break
        case 72: // h 左
          if (focus == 'main') {
            if (listLeft) {
              listLeft.className = ''
            }
            if (listLeft.previousSibling) {
              listLeft.previousSibling.className = 'code-sel'
            }

            listLeft = listLeft.previousSibling
          }
          break
        case 76: // l 右
          if (focus == 'main') {
            if (listLeft) {
              listLeft.className = ''
            }
            if (listLeft.nextSibling) {
              listLeft.nextSibling.className = 'code-sel'
            }

            listLeft = listLeft.nextSibling
            console.log(listLeft)
          }
          break
      case 79: // o 打开文件
        if (focus == 'left') {
          openFile(listNode.textContent)
        }
        break
      case 73: // i 插入
        status = 1
        document.getElementById('status').innerHTML = 'INSERT'
        break
      default:
        break
    }
  }
}

function openFile(fileName = 'test.txt') {
  document.getElementById('main').innerHTML = ''
  let fRead = fs.createReadStream(fileName)

  let lines = readline.createInterface({
    input: fRead
  })

  let num = 1
  let codeFmt = ''
  lines.on('line', (line) => {
    let lineArr = line.split('')
    let lineTmp = ''
    for (let i = 0; i < lineArr.length; i++) {
      lineTmp += `<ee>${lineArr[i]}</ee>`
    }
    tmp = `<span class='text-num'>${num}</span> <code>${lineTmp}</code>`
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

function openMenu() {
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
}
