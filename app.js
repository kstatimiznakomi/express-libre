console.log('hello world :)');


const http = require("http");
 
const server = http.createServer((req,res) => {
    
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    try{
      router(res, req.url, req.method)  
    }
    catch(er){
        console.log(er)
    }


    res.end()
}).listen(3000)

const router = (res,url,method) => {
    url === '/home' && method === 'GET' 
        res.write('home',() => {
            return `<h2>Home</h2>`
        })
}
