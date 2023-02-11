## fs模块  

```js
fs.stat('./index.html', (err, data) => {
  
  console.log(data.isFile()); // 是文件？ 
  console.log(data.isDirectory()); // 是目录？
})

fs.exists() // 检查一个文件或目录是否存在

fs.realpath() // 获取一个文件或目录的绝对路径 

fs.open // 内存中打开文件 

fs.mkdir  // 创建目录  
fs.utimes // 修改文件的访问时间和修改时间
fs.chmod // 修改未见或者目录的读写权限
fs.link // 创建文件硬链接
fs.unlink


fs.writeFile  //创建写入文件（写入内容覆盖） 
// 追加内容到xx文件
fs.writeFile('x', data, {
  flag: 'a'
})

fs.appendFile //在原来的基础上追加文件内容

fs.readFile // 读文件 buffer类型  data.toString()可以转换为string 

fs.readdir // 读取目录 

fs.rename // 重命名，移动文件 

fs.rmdir // 删除目录 


在有限的内存中实现我们操作"海量"数据的目标.
// readFile,read,writeFile,write的区别
readFile，writeFile处理完整内容， read, write处理部分内容

// 从指定位置开始读写文件
var fs=require('fs');
fs.open('./message.txt','r',function(err,fd) {
    var buf=new Buffer(255);
    //一个汉字的utf编码为三个字节数据
    // 0指定向缓冲区写入数据的开始位置，9指定从文件中读取的字节数，3指定读取文件时的开始位置
    fs.read(fd,buf,0,9,3,function(err, bytesRead, buffer){
      console.log(buffer.slice(0,bytesRead).toString());
      fs.close(fd)
    });
})


fs.createReadStream // 读取文档流,大文件读取对内存太不友好
var readstream = fs.createReadStream(url)
readstream.on('data',(data)=> {
  str+=data // 分批读取 
})

readstream.on('end',()=>{
  console.log(str) // 最终的读取内容
})

readstream.on('error') 

var writeStream = fs.createWriteStream(url)
writeStream.write(str) // 以流的方式写入内容 

writeStream.end() // 必须 
writeStream.on('finish',()=>{
  console.log('写入完成')
}) 


// 管道流（文件大比较合适） 
// 把文件输出到其他地方 ,复制文件
readstream.pipe(writeStream)

```

```js
var fs = require('fs');
var file = fs.createWriteStream('./stdout.txt');

var logger = new console.Console(file, file);

logger.log('hello');
logger.log('word');

// 备注：内容输出到 stdout.txt里，而不是打印到控制台
```
fs.watchFile
监视文件或目录的改动


https://github.com/perany/Node.js-Demo/tree/master/chapter6