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
    }
};

function iodriver(ioreq) {
    io.ready = false;
    switch(ioreq.task) {
        case "open":
            setTimeout(io.open(ioreq), 10);
            break;
        case "read":
            setTimeout(io.read(ioreq), 10);
            break;
    }
}
