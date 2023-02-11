## Buffer 
内存中创建出来的缓冲区,连续内存，不需要require引入
js数组不能进行二进制数据的操作，不像java,python等语言效率高

```js
Buffer.alloc(10) // 创建一个缓存区，10个字节(长度为10，默认0填充)
Buffer.alloc(10,1) // 用0x1填充
Buffer.allocUnsafe(10) // 创建长度10，未初始化的buffer(内存分配快)，比alloc方法快，返回的buffer可能有旧数据，需要用fill()或write()重写

Buffer.from([1, 2, 3]) // 创建0x1 0x2 0x3填充的buffer, 可以用for of遍历
```


## Buffer 二进制的处理 (二进制太长，所以用16进制表示)

buffer和string之间的转换
```js
var str = '接口地方'
var buf = Buffer.from(str) // 创建包含utf-8字节
```

str[2] 获取的是第三个文字
buf[2] 获取的是缓存区中第三个字节数据转换为整数后的数值

字符串不可修改，Buffer对象可以修改

Buffer有slice方法，并不是复制缓存区的数据，而是与该数据共享内存区域，修改slice取出的数据，缓存区数据也被修改。

Buffer.toString()   //Bugger对象到string转换

Buffer.write() // 向已经创建的buffer对象中写入字符串


Buffer.isBuffer(obj) // 判断一个对象是否是Buffer对象

Buffer.byteLength('xx', 'utf8') // 计算一个指定字符串的字节数

Buffer.concat([x,x,x]) // 将几个buffer对象结合为一个新的buffer对象

Buffer.isEncoding() // 检验一个字符串是否为一个有效的编码格式字符串
Buffer.isEncoding('utf8') // true
Buffer.isEncoding('utf8xx')  // false