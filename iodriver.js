var io = {
    ready: true,
    open: function(ioreq) {
        //get fp for given filename
        //TODO
        ioreq.fp = 1;
        ioreq.done = true;
    },
    read: function(ioreq) {
        //get fp for given filename
        //TODO
        ioreq.data = data;
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
