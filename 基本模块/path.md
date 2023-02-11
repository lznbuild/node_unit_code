## path 
不同的操作系统的路径分隔符不统一，window  /\都行，linux /  ,所以有了path模块。 
node中的相对路径，指的是命令运行的路径。


```js
const path = require('path')
path.extname(url) // 获取后缀名 

// path.basename(filepath) 只是输出路径的最后一部分，并不会判断是否文件名
// 输出：test.js
console.log( path.basename('/tmp/demo/js/test.js') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test/') );

// 输出：test
console.log( path.basename('/tmp/demo/js/test') );
// 输出：test
console.log( path.basename('/tmp/demo/js/test.js', '.js') );
```

path.resolve('/foo/bar', './baz') 可以看成下面命令的结果

cd /foo/bar
cd ./baz