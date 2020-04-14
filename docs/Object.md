# Object方法总结
* let obj = {a: 1, b: 2}
* let obj1 = function() {}
* 简写: let x = 1, y = 2; let obj2 = {x, y}
## 定义在Object上方法
* Object.getPrototypeOf(obj) 返回obj的原型对象
* Object.setPrototypeOf(obj) 设置obj的原型对象
* Object.create(obj) 以obj为原型生成新的对象，继承obj的属性
* Object.getOwnPropertyNames(obj) 返回所有属性名，不包括继承的属性
* Object.getOwnPropertyDescriptor(obj, key) 获取key属性的描述对象
* Object.getOwnPropertyDescriptors(obj) 获取所有属性的描述对象
* Object.is(obj, obj1) 判断obj与obj1是不是相等
* Object.assign(target, sour1, sour2) 将sourX的可枚举属性赋值到target上， 后面的属性覆盖前面的
* Object.fromEntries(entries) 从键值对数组生成一个对象
## 定义在实例对象上的方法,也就是定义在Object.prototype上
* obj.__proto__  obj的实例对象，可读写，只有浏览器环境才有
* obj.isPrototypeOf(obj1) 判断obj是否是obj1的原型对象
* obj.hasOwnProperty(key) 判断是否包含属性key
## 循环遍历
* in运算符 判断属性存在，会包含继承属性
* for(let k in obj){}  遍历所有课遍历属性
* Object.keys(obj)  返回对象自身所有可枚举的属性
* Object.values(obj)
* Object.entries(obj)
* Reflect.ownKeys(obj)  返回所有的属性
## 运算符
* instanceof 判断类型:   
  let v = new Vehicle(); v instanceof Vehicle
* 扩展运算符(...):  
  let {x, y, ...z} = {x: 1, y: 2, z: 3, a: 4}  (z={z: 3, a: 4})
* 链判断运算符(?.)左侧对象如果为null或undefined, 中断操作，返回undefined):  
  const firstName = message?.body?.user?.firstName || 'default'
* null判断运算符(代替||):  
  const firstName = message?.body?.user?.firstName ?? 'default'
