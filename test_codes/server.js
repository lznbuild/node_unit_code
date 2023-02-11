const http = require('http')
const domain = require('domain')

http.createServer((req, res)=> {
  const d = domain.create();

  d.once('error', err=> {
    
  })
})