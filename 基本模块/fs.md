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


fs.writeFile  //创建写入文件（写入内容覆盖） 

fs.appendFile //在原来的基础上追加文件内容

fs.readFile // 读文件 buffer类型  data.toString()可以转换为string 

fs.readdir // 读取目录 

fs.rename // 重命名，移动文件 

fs.rmdir // 删除目录 

fs.unlink // 删除文件 

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

fs.watchFile
监视文件或目录的改动