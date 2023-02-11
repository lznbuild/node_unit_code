process.on('message', (data)=> {
  console.log('child进程接收：' , data)
})

process.send('hello master')