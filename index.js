var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    console.log('one user connected '+socket.id);
	socket.emit('news', { hello: 'world' });
	 
    socket.on('message',function(data){
		
		console.log("data = "+JSON.stringify(data));
		var sockets = io.sockets.sockets;
        sockets.forEach(function(sock){
            if(sock.id === socket.id)
            {	
                sock.emit('message',data);
				console.log("sending data back to same client");
            }
        });
		
		
    })
    socket.on('disconnect',function(){
        console.log('one user disconnected '+socket.id);
    })
})

http.listen(3000,function(){
	console.log('server listeneing on port 3000');
});