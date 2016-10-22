var rtToastr = (function(toastr, io){
    var socket;
        
    var obj = {
        subscribe: function(eventName, callback){
           if(!socket){
                socket = this.create("http://localhost:3001");
            }
           socket.on(eventName, function(msg){
                var message = JSON.parse(msg);
                if(message){
                toastr[message.type](message.message);
                }else{
                    toastr.error("Wrong Format for:" + msg);
                }
                if(callback && typeof callback === "function"){
                    callback.call();
                }           
            });
            return socket; 
        },
        create: function(fullurl){
             if(!socket){
                socket = io(fullurl);
            }            
            return socket;
        },
        getSocketInstance: function(){
            return socket;
        }
    };    
    return obj;    
}(toastr, io));