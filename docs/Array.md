# Array方法总结
let arr = [1, 2, 4, 5]
* arr.toString() 1, 2, 4, 5
* arr.valueOf()  [1, 2, 4, 5]
* ...arr 1，2，3，4 // 扩展运算符,把数组变成值序列，常用于可变参数传值
* Array.from(obj, func, obj1) 把两类对象变成数组，类似数组对象（有length属性）,可遍历（iterable）的对象.func参数可选，有的话会把每个元素执行func以后再放入新数组
## 影响原数组的方法
* arr.push(12, 13) 添加到数组末尾，返回修改后数组的长度
* arr.pop()  删除最后一项，返回删除的项
* arr.unshift(12, 13)  添加到数组开头，返回修改后数组的长度
* arr.shift()  删除第一项，返回删除的项
* arr.reverse() 返回反转后的数组
* arr.sort() 升序排列,调用元素的toString()方法比较字符串,即使是数组，也是比较字符串
* arr.sort((v1, v2) => v1 - v2)  这是按数值升序排列，如果compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前
* arr.splice(start,delete_count,insert_item[可选])，返回被删除的项
start起始位置，d_count为要删除的项数，inserts为要插入的项。插入的项数与删除的项数不必相等。insert_item写成数组形式的话会把数组插进去

## 不影响原数组的方法
* arr.join('|')  1|2|4|5,  使用|构建字符串,
* arr.concat(1, [2, 3]) 把1, 2， 3添加到原数组末尾，返回新的数组
* arr.concat(1, 2, 3)  效果一样
* arr.slice(1, 3) 切片函数，返回[1, 3)中的元素, 支持负坐标
* arr.indexOf(v)  从数组开头寻找v，没找到返回-1
* arr.lastIndexOf(v)  从数组末尾往前查找
* arr.reduce((pre, cur, index, arr) => pre + cur) 归并方法，执行函数把所有的项归并为一项，pre是前一项，cur是当前项
* arr.reduceRight((pre, cur, index, arr) => pre + cur)
### 迭代方法，对数组每一项运行
func有两个参数(value, index)
* arr.forEach(func)  执行函数，没有返回值
* arr.map(func)  把func对每个元素的返回结果组成新数组返回
* arr.filter(func) 对func返回true的项组成新数组返回
* arr.every(func)  如果func对每一项返回true，则返回true
* arr.some(func)  只要func对某一项返回true，则返回true
* arr.find(func) 依次对每一项执行func，直到找到第一个结果为true的，返回这一项
* arr.findIndex(func) 类似find方法，返回这一项的index
