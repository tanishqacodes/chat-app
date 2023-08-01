const express = require('express');
const app = express();

const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});

// static file location(where css) file locate:
app.use(express.static(__dirname+'/public'));


// create a route 
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});



// socket creation at server side


const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log("Connected....");
    // the msg emitted fromt he client side will listem here
    socket.on("message",(msg)=>{
        socket.broadcast.emit('message',msg);
        console.log("meassge server side  : ",msg);
    });
});

