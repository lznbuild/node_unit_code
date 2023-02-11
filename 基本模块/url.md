## parse

```js
var url = require('url');
var str = 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1';

// true解析query部分为对象
var obj = url.parse(str, true);
console.log(obj);
```
## format 
parse的反向操作

## resolve(from, to)
用法比较简单，直接贴官方文档的例子
```js
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```

## querystring
```js
var querystring = require('querystring');
var str = 'nick=casper&age=24';
var obj = querystring.parse(str);
console.log(JSON.stringify(obj, null, 4));
```