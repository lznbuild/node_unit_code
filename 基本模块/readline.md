## readline 
```js
const readline=require('readline')
const r = readline.createInstance({
  put:process.stdout,
  input:process.stdin
})

r.question('今晚吃啥',(answer)=> {
  console.log('答复：',answer)
  r.close()
})

r.on('close',()=>{
  process.exit(0)
})
```