const http = require("http");
const fs = require("fs");
const path = require("path");
const f = require("./mytest");


const filePath = path.join(process.cwd(),"data.txt");

const server = http.createServer((req,res) => {
    if(req.url === "/"){
        res.write("hello");
        console.log(f);
        res.end();
        
    }
    else if(req.url === "/form"){
        res.setHeader("Content-Type","text/html");
        res.write("<form action='/submit' method='POST'><input name='data'/><button>Submit</button></form>");
        res.end();
    }
    else if(req.url === "/submit"){
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => {
            fs.readFile(filePath,"utf8",(_,fileData) => {
                const newdata = fileData + "\n" + data;
                fs.writeFile(filePath,newdata,() => {
                    res.write("Data received");
                    res.end();
                })
            })
        })
    }
    else{
        res.write("404 - Not found")
        res.end();
    }
});
server.listen(3000);