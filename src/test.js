// 不能省略分号的情况，下一行以括号开头
// 仅以下情况bool运算返回false：undefined, null, 0, '', NaN
// 双重否定运算符跟Boolean函数是一样的效果

let log = console.log
function add(...x) {
  return x.reduce((m, n) => m+n)
}
// log(add(1, 2, 3))

var dd = ['a', 'b', 'c']
function hello(x1, x2, x3) {
  log('hello %s %s %s', x1, x2, x3)
}
// hello(...dd)

// dd.forEach(v => log(v))

function dictJieGou() {
  let node = {type: 'student', name: 'tom'}
  let {type, name} = node
  log(type, name)
}
function dictJieGou1() {
  let node = {type: 'student', name: 'tom'}
  type = 'teacher'
  name = 'jack'
  (node = {type, name})
  log(node)
}
function dictJieGou2() {
  // let node = {type: 'teacher', name: 'name'}
  let node = {type: 'teacher'}
  let {type: localType, name: name = 'tom'} = node
  log(localType, name)
}
// dictJieGou2()

function listJiegou() {
  let colors = ['red', 'greeen', 'blue']
  let [color1, color2] = colors
  let [,,color3] = colors
  log(color1, color2, color3)
}
function listJiegou1() {
  // 下一行以括号开头，因此行尾必须加分号
  let a = 3, b = 4;
  [a, b] = [b, a]
  log(a, b)
}
// listJiegou1()


// {'2': 2, foo: 'foo', bar: 'bar', '[object Object]': 'someobj1'}
function testDict() {
  const obj = {}
  obj.foo = 'foo'
  obj['bar'] = 'bar'
  obj[2] = 2
  obj[{}] = 'someobj'
  obj[{'a': 1}] = 'someobj1'
  log(obj)
}
function createSymbol() {
  s1 = Symbol()
  s2 = Symbol('test')
  s3 = Symbol('test')
  log(s1)
  log(s2)
  log(s2 == s3)
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

  log(obj) // { bar: 'bar' }
  log(sym in obj) // true
  log(obj[sym]) // foo

  log(Object.keys(obj)) // ['bar']
  log(Reflect.ownKeys(obj))

  var objSymbols = Object.getOwnPropertySymbols(obj)
  log(objSymbols)
}
// symbolKey()

function testUserError() {
  function UserError(message) {
    this.message = message || 'default error'
    this.name = 'UserError'
  }
  UserError.prototype = new Error()
  UserError.prototype.constructor = UserError

  err = new UserError('custom_error')
  log(err.message, err.name);

  // throw new UserError('error!!')
}
// testUserError()

function tryCatch() {
  try {
    x + 1
  } catch(e) {
    log(e.name, e.message)
    log(e.stack)
  } finally {
    log('trycatch finally')
  }
  log('trycatch continue')
}
// tryCatch()

function tryCatch1() {
  try {
    log(0);
    throw 'bug';
  } catch(e) {
    log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    log(2); // 不会运行
  } finally {
    log(3);
    return false; // 这句会覆盖掉前面那句 return
    log(4); // 不会运行
  }

  log(5); // 不会运行
}
// log(tryCatch1())

function varLet() {
  // var有声明提升,i是函数内的局部变量，所以会一直输出10
  log('var')
  for (var i = 0; i < 10; i++) {
    setTimeout(function() {
        log(i);
    }, i * 1000);
  }

  // let没有声明提升，每次循环都是一个不同的i
  log('let')
  for (let i = 0; i < 10; i++) {
    setTimeout(function() {
        log(i);
    }, i * 1000);
  }
}
// varLet()

function testConsole() {
  // ['log', 'info', 'warn', 'error'].forEach(function(method) {
  //   console[method] = console[method].bind(
  //     console,
  //     new Date().toISOString()
  //   )
  // })
  // log("出错了！")

  log(
    '%cThis text is styled!',
    'color: red; background: yellow; font-size: 24px;'
  )

  var languages = [
    { name: "JavaScript", fileExtension: ".js" },
    { name: "TypeScript", fileExtension: ".ts" },
    { name: "CoffeeScript", fileExtension: ".coffee" }
  ]
  console.table(languages)

  log({f1: 'foo', f2: 'bar'})
  console.dir({f1: 'foo', f2: 'bar'})

  console.assert(false, '判断条件不成立')

  console.time('Array initialize');
  var array= new Array(1000000);
  for (var i = array.length - 1; i >= 0; i--) {
    array[i] = new Object();
  };
  console.timeEnd('Array initialize');

  console.trace()
}
// testConsole()

var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true


function testObj() {
  var obj = {p: 'a'}
  log(Object.getOwnPropertyDescriptor(obj, 'p'))

  var obj = Object.defineProperty({}, 'p', {
    value: 123,
    writable: false,
    enumerable: true,
    configurable: false
  });
  obj.p // 123
  obj.p = 246;
  obj.p // 123
}

function setget() {
  var obj ={
    $n : 5,
    get next() { return this.$n++ },
    set next(n) {
      if (n >= this.$n) this.$n = n;
      else throw new Error('新的值必须大于当前值');
    }
  };
  
  obj.next // 5
  
  obj.next = 10;
  obj.next // 10
  
  // obj.next = 5;
  // Uncaught Error: 新的值必须大于当前值
}
setget()

// 对象拷贝，支持拷贝get,set函数
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}

// obj = {}
// extend(obj, { get a(){ return 1 } })
// log(obj)
// { get a(){ return 1 } })

function testArray() {
  let a = [1, 2, 3]
  log(a.toString())
  log(a.join('|'))
  while(a.length > 0) {
    log(a.shift())
  }

  // 通过call方法，这个方法也可以用于字符串或类似数组的对象
  Array.prototype.join.call('hello', '-')
  // "h-e-l-l-o"

  var obj = { 0: 'a', 1: 'b', length: 2 };
  Array.prototype.join.call(obj, '-')
  // 'a-b'

  let obj1 = [1, 4, 2, 6, 0, 6, 2, 6]
  obj1.sort((a, b) => a - b)
  log(obj1)

  let numbers = [1, 2, 3]
  let numbers1 = numbers.map(n => n + 1)
  let numbers2 = numbers.map((elem, index, arr) => elem * index)
  log(numbers, numbers1, numbers2)

  let arr = Array.prototype.slice.call('abcdfe')
  // let arr1 = [1, 2].map(e => this[e])
  let arr1 = [1, 2].map(function(e) {
    return this[e]
  }, arr)
  log(arr, arr1)

  numbers.forEach(n => n+1)
  log(numbers)

  let arr2 = [1,2,3,4,5].filter(e => e > 3)
  log(arr2)

  let result = [1,2,3,4,5].reduce((a, b) => a + b)
  let result1 = [1,2,3,4,5].reduce((a, b) => a + b, 10)
  let result2 = [1,2,3,4,5].reduce((a, b) => a - b)
  log(result, result1, result2)

  numbers.indexOf('a', 1)
}
// testArray()

function testBaozhuangDuixiang() {
  String.prototype.double = function() {
    return this.valueOf() + this.valueOf()
  }
  Number.prototype.double = function() {
    return this.valueOf() + this.valueOf()
  }
  log('abc'.double())
  log((123).double())

  let b = new Boolean(false)
  if(b) log('b is true')
  if(b.valueOf()) log('value of b is true')

  log(String.fromCharCode(97))
}
// testBaozhuangDuixiang()

function testThis() {
  let person = {
    name: '张三',
    describe: function() {
      return 'name: ' + this.name
    }
  }
  log(person.describe())

  this.name = '李四'
  let f = person.describe
  log(f())

  function f1(x, y){
    log(this.i + x + y)
  }  
  f1.call({i: 1}, 1, 1)
  f1.apply(null, [1, 1])

  // 求数组最大值的几种方法
  let a = [10, 2, 4, 15, 9]
  log(Math.max.apply(null, a))
  log(a.reduce((x, y) => x > y ? x : y))

  // 利用apply把类似数组对象转成数组，该对象需要有length属性
  Array.prototype.slice.apply({0: 1, length: 1}) // [1]
  Array.prototype.slice.apply({0: 1}) // []
  Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
  Array.prototype.slice.apply({length: 1}) // [undefined]
}
// testThis()

function testBind() {
  let d = new Date()
  log(d.getTime())
  // TypeError: this is not a Date object.
  // let print = d.getTime
  // log(print()) 
  let print = d.getTime.bind(d)
  log(print())

  let add = function(x, y) {
    log(x, y)
    log(x * this.m + y * this.n)
  }
  let obj = {m: 2, n: 3}
  let add1 = add.bind(obj, 4)
  add1(5)

  let counter = {
    count: 0,
    inc: function() {
      this.count++
      log(this.count)
    }
  }
  function callIt(cb) {
    cb()
  }
  callIt(counter.inc)  //输出NaN
  callIt(counter.inc.bind(counter))

  let obj1 = {
    name: '张三',
    times: [1, 2, 3],
    print: function () {
      this.times.forEach(function (n) {
        log(this.name)
      }, this) // 这里不传入this的话，会输出undefined
    }
  } 
  obj1.print()
}
// testBind()

function testPrototype() {
  log(Object.prototype)

  function getPrototype(obj) {
    while(obj) {
      obj = Object.getPrototypeOf(obj)
      log(obj)
    }
  }
  getPrototype({})
  getPrototype(function(){})
  // getPrototype(new Number(0))
  
}
// testPrototype()

function testObject() {
  // __proto__属性返回对象的原型，可读写
  let obj = {}
  let p = {}
  obj.__proto__ = p
  Object.getPrototypeOf(obj) == p

  let p1 = new Object()
  log(p1.property)
  log(p1.__proto__ === p1.prototype)
  log(p1.__proto__ === Object.prototype)
  log(p1.__proto__ === p1.constructor.prototype)
  // getPrototypeOf是最可靠的获取原型的方法
  log(p1.__proto__ === Object.getPrototypeOf(p1))

  log(Object.getOwnPropertyNames(Date))
  let d = new Date()
  log(Object.getOwnPropertyNames(d))
  log(d)
  let d1 = Date()
  log(Object.getOwnPropertyNames(d1))
  log(d1)

  log(Date.hasOwnProperty('length'))
}
// testObject()

function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  )
}

function copyObject(orig) {
  let copy = Object.create(Object.getPrototypeOf(orig))
  Object.getOwnPropertyNames(orig).forEach(function(key) {
    let desc = Object.getOwnPropertyDescriptor(orig, key)
    Object.defineProperty(copy, key, desc)
  })
  return copy
}

// f1.on('done', f2)
// function f1() {
//   log('f1 run')
//   setTimeout(function() {
//     f1.trigger('done')
//   }, 1000)
// }
// function f2() {
//   log('f2 run')
// }
// f1()

// jQuery.subscribe('done', f2)

function testPromise() {
  let result = false
  function f1(resolve, reject) {
    log('f1 run')
    if (result) {
      resolve('f1 success')
    } else {
      reject('f1 failed')
    }
  }
  let p1 = new Promise(f1)
  p1.then(console.log, console.error)

  // promise的报错有传导性，会传到最后一个reject回调函数
  // p1
  //   .then(step1)
  //   .then(step2)
  //   .then(step3)
  //   .then(
  //     console.log,
  //     console.error
  //   )
}
// testPromise()

function testJIEGOU() {
  function f() {
    return [1, 2, 3]
  }
  let [a, b, c] = f()
  log(a, b, c)

  let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
  }
  let {id, status, data: numbers} = jsonData
  log(id, status, numbers)

  // 函数参数的默认值
  // jQuery.ajax = function (url, {
  //   async = true,
  //   beforeSend = function () {},
  //   cache = true,
  //   complete = function () {},
  //   crossDomain = false,
  //   global = true,
  //   // ... more config
  // } = {}) {
  //   // ... do stuff
  // }

  // 遍历map
  const m = new Map()
  m.set('f', 'hello')
  m.set('s', 'world')
  for (let [k, v] of m) {
    log(k + ' is ' + v)
  }
  // 获取键名
  for (let [key] of m) {
    // ...
  }
  // 获取键值
  for (let [,value] of m) {
    // ...
  }
}
// testJIEGOU()

function testString1() {
  // 模板字符串, 反引号
  console.log(`string text line 1
  string text line 2`.trim());
  let name = "Bob", time = "today"
  log(`Hello ${name}, how are you ${time}?`)

  log(String.fromCodePoint(0x20BB7))
  log(String.fromCodePoint(0x78, 0x1f680, 0x79))

  let s = '𠮷a';
  log(s.codePointAt(0).toString(16))
  log(s.codePointAt(1).toString(16))
  log(s.codePointAt(2).toString(16)) // a应该是位置1的字符，但是必须传入2
  for (let c of s) {
    log(c.codePointAt(0).toString(16))
  }

  function is32Bit(c) {
    log(c.codePointAt(0) > 0xFFFF)
  }
  is32Bit("𠮷") // true
  is32Bit("a") // false

  let s1 = 'Hello world!'
  s1.startsWith('Hello') // true
  s1.endsWith('!') // true
  s1.includes('o') // true

  s1.startsWith('world', 6) // true
  s1.endsWith('Hello', 5) // true
  s1.includes('Hello', 6) // false
}
// testString1()

function testFunction() {
  // arguments
  function sort1() {
    Array.prototype.slice.call(arguments).sort()
  }
  // rest参数，只能是最后一个参数
  let sort2 = (...numbers) => numbers.sort()

  function push(arr, ...items) {
    items.forEach(function(i) {
      arr.push(i)
      log(i)
    })
  }
  push([1, 2], 3, 4, 5)

  // 箭头函数如果返回对象，需要用括号括起来，因为大括号会被当成代码块
  let f = v => ({a: 1, b: 'a'})
  log(f())
}
// testFunction()

function testArrayES6() {
  // ...运算符
  log(1, ...[1, 2, 3], 5)
  function push(arr, ...items) {
    arr.push(...items)
  }
  function add(x, y) {
    return x + y
  }
  const numbers = [4, 38];
  add(...numbers) // 42

  let a = [1, 2, 3, 4, 5]
  Math.max(...a)
  // 复制数组
  let b = [...a]

  // 与解构运算结合
  let [c, ...a1] = a
  log(c, a1)

  // 将字符串转成数组
  log([...'hello'])

  function length(str) {
    return [...str].length;
  }
  log(length('x\uD83D\uDE80y')) // 3

  let s = [...'hello']
  // for (let i of s.keys()) {
  //   log(i)
  // }
  // for (let i of s.values()) {
  //   log(i)
  // }
  for (let [k, v] of s.entries()) {
    log(k, v)
  }
}
// testArrayES6()

function testObjectES6() {
  let point = (x, y) => ({x, y})
  log(point(3, 5))

  let o = {
    f() { log('f run') }
  }
  // 相当于
  let o1 = {
    f: function(){ log('f run') }
  }
  o.f()

  let a = [1, 2 ,3]
  a['1'] = 12
  log(a)
  log(Reflect.ownKeys(a))

  let a1 = {
    find() {
      return super.tt
    }
  }

  let o2 = {x: 1, y: 2, z: 3, a: 4, s: 5}
  let {x, y, ...z} = o2
  log({x, y, z})
  let o3 = {...o2}
  log(o3)

  // 拷贝一个对象的方法
  function clone(obj) {
    let proto = Object.getPrototypeOf(obj)
    let obj1 = {__proto__: proto, ...obj}
    let obj2 = Object.assign(Object.create(proto), obj)
    let obj3 = Object.create(proto, Object.getOwnPropertyDescriptors(obj))
  }

  // ?.  链判断运算符，在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。
  // const firstName = message?.body?.user?.firstName || 'default'
  // 等同于以下的判断
  // const firstName = (message
  //   && message.body
  //   && message.body.user
  //   && message.body.user.firstName) || 'default';
  // 三种使用方法
  // obj?.prop // 对象属性
  // obj?.[expr] // 同上
  // func?.(...args) // 函数或对象方法的调用

  // ??  null判断运算符，当左边的值是null或者undefined时，返回右边的值
  // const headerText = response.settings.headerText ?? 'Hello, world!';
  // let response = {}
  // const animationDuration = response.settings?.animationDuration ?? 300;
}
// testObjectES6()

function testSymbol() {
  let s = Symbol('abc')
  log(s)
  log(s.toString())
  log(s.description)
}
testSymbol()
