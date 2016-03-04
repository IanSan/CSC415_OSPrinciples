var io = {
    ready: true,
    open: function(ioreq) {
        //get fp for given filename
        ioreq.fp = fs.getFilePointer(ioreq.data);
        ioreq.done = true;
    },
    read: function(ioreq) {
        for (var i = 0; i < ioreq.size; i++) {
            ioreq.data[i] = fs.getFileData(ioreq.fp);
            ioreq.fp.index = ioreq.fp.index + 1;    //incr fp
        }
        ioreq.done = true;
    },
    write: function(ioreq) {
        for (var i = 0; i < ioreq.size; i++) {
            fs.setFileData(ioreq.fp, ioreq.data[i]);
            ioreq.fp.index = ioreq.fp.index + 1;    //incr fp
        }
        ioreq.done = true;
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
