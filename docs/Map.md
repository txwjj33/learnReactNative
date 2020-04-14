# Map方法总结
let m = new Map([
  ['name', 'zhangsan'],
  ['title', 'sss'],
])
* m.size 返回成员数
* m.has('name') 判断key存在
* m.get('name') 获取value
* m.delete('name') 删除key
* m.clear() 清空map
## 遍历方法
* m.forEach(func)
* m.keys()
* m.values()
* m.entries() 返回[key, value]二元数组，如：  
  for(let [k, v] of m.entries()) {}  
  也可以简写为 for(let [k, v] of m) {}
## for...in和for...of
* for...in遍历的是key，for...of遍历的是值
* for...of只会遍历数组的那些值，比如let arr = [1, 2, 3] arr['a']=12，for...of不会遍历到12
* 推荐对象遍历使用for...in， 数组遍历使用for...of
## 其他
* 对象转map，new Map(Object.entries(obj))
* 遍历的函数结果是Iterator类型，不是数字，可以通过扩展运算符(...)变成数组,如：  
  [...m.keys()], [...m.values()], [...m.entries()]==[...m]
