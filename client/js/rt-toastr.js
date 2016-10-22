var rtToastr = (function(toastr, io){
    var a = toastr;
    var socket;
        /*socket.on('message', function(msg){
            var message = JSON.parse(msg);
            toastr[message.type](message.message);
    });*/
    
    var obj = {
        subscribe: function(eventName, key){
           if(!socket){
                socket = io("http://localhost:3001",{key: key});
            }
           socket.on(eventName, function(msg){
                var message = JSON.parse(msg);
                if(message){
                toastr[message.type](message.message);
                }else{
                    toastr.error("Wrong Format for:" + msg);
                }
            }); 
        }
    };
    
    return obj;
    
}(toastr, io));