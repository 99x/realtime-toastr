rtToastr.subscribe("errorCount", function () {
    console.log("function Invoked!")
});

rtToastr.subscribe("FailMessage");
rtToastr.subscribe("SuccessMessage");
var soc = rtToastr.create();
//soc.emit('test');
