## path 
不同的操作系统的路径分隔符不统一，window  /\都行，linux /  ,所以有了path模块。 
node中的相对路径，指的是命令运行的路径。


```js
const path = require('path')
path.extname(url) // 获取后缀名 
```