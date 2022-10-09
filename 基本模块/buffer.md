## Buffer 
内存中创建出来的缓冲区,连续内存
js数组不能进行二进制数据的操作，不像java,python等语言效率高

```js
Buffer.alloc(10) // 创建一个缓存区，10个字节
```


## Buffer 二进制的处理 (二进制太长，所以用16进制表示)

buffer和string之间的转换
```js
var str = '接口地方'
var buf = Buffer.from(str)
```

str[2] 获取的是第三个文字
buf[2] 获取的是缓存区中第三个字节数据转换为整数后的数值

字符串不可修改，Buffer对象可以修改

Buffer有slice方法，并不是复制缓存区的数据，而是与该数据共享内存区域，修改slice取出的数据，缓存区数据也被修改。

Buffer.toString()   //Bugger对象到string转换


Buffer.isBuffer(obj) // 判断一个对象是否是Buffer对象