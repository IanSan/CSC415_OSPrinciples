var io = {
    ready: true,
    open: function(ioreq) {
        //get fp for given filename
        ioreq.fp = fs.getFilePointer(ioreq.data);
        ioreq.done = true;
    },
    read: function(ioreq) {
        //get fp for given filename
        ioreq.data = fs.getFileData(ioreq.fp);
        ioreq.done = true;
    }, 
    write: function(ioreq) {

    }
};

//setTimeout(function, time-ms) after the time in millisec pass the function will trigger
function iodriver(ioreq) {
    io.ready = false;
    switch(ioreq.task) {
        case "open":
            setTimeout(io.open(ioreq), 10);
            break;
        case "read":
            setTimeout(io.read(ioreq), 10);
            break;
        case "write":
            setTimeout(io.write(ioreq), 10);
            break;
        case "close":
            setTimeout(io.close(ioreq), 10);
            break; 
    }
}
