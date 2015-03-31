var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var currentlyAnimating = false;
var animatingMonitor = 0;

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  if(currentlyAnimating == false){

  	socket.on('monitor connect', function(monitor){
  		if (monitor == 1){
  			//start monitor 1 animaiton
  			io.emit('animate Monitor 1');
  			currentlyAnimating = true;
  			console.log('monitor one animating');
  		}
  	}); 

  } else {

  } 

  socket.on('animation complete', function(monitor){
  		console.log('animation complete');
  		console.log(monitor);
  		if (monitor == 1){
  			io.emit('animate Monitor 2');
  			console.log('animating monitor 2');
  		} else {
	  		io.emit('animate Monitor 1');
	  		console.log('animating monitor 1');
  		}

  	});

});



http.listen(7072, function(){
  console.log('listening on *:7072');
});