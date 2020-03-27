function add(...x) {
  return x.reduce((m, n) => m+n)
}
// console.log(add(1, 2, 3))

var dd = ['a', 'b', 'c']
function hello(x1, x2, x3) {
  console.log('hello %s %s %s', x1, x2, x3)
}
// hello(...dd)

// dd.forEach(v => console.log(v))

function dictJieGou() {
  let node = {type: 'student', name: 'tom'}
  let {type, name} = node
  console.log(type, name)
}
function dictJieGou1() {
  let node = {type: 'student', name: 'tom'}
  type = 'teacher'
  name = 'jack'
  (node = {type, name})
  console.log(node)
}
function dictJieGou2() {
  // let node = {type: 'teacher', name: 'name'}
  let node = {type: 'teacher'}
  let {type: localType, name: name = 'tom'} = node
  console.log(localType, name)
}
// dictJieGou2()

function listJiegou() {
  let colors = ['red', 'greeen', 'blue']
  let [color1, color2] = colors
  let [,,color3] = colors
  console.log(color1, color2, color3)
}
function listJiegou1() {
  // 下一行以括号开头，因此行尾必须加分号
  let a = 3, b = 4;
  [a, b] = [b, a]
  console.log(a, b)
}
listJiegou1()


// {'2': 2, foo: 'foo', bar: 'bar', '[object Object]': 'someobj1'}
function testDict() {
  const obj = {}
  obj.foo = 'foo'
  obj['bar'] = 'bar'
  obj[2] = 2
  obj[{}] = 'someobj'
  obj[{'a': 1}] = 'someobj1'
  console.log(obj)
}
function createSymbol() {
  s1 = Symbol()
  s2 = Symbol('test')
  s3 = Symbol('test')
  console.log(s1)
  console.log(s2)
  console.log(s2 == s3)
}
// createSymbol()
function symbolKey() {
  const obj = {}
  const sym = Symbol()
  const sym1 = Symbol()
  obj[sym] = "foo"
  obj[sym1] = "foo1"
  obj.bar = "bar"
  obj.bar1 = "bar1"

  console.log(obj) // { bar: 'bar' }
  console.log(sym in obj) // true
  console.log(obj[sym]) // foo

  console.log(Object.keys(obj)) // ['bar']
  console.log(Reflect.ownKeys(obj))

  var objSymbols = Object.getOwnPropertySymbols(obj)
  console.log(objSymbols)
}
// symbolKey()