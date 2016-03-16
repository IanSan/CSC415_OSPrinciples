var io = {
    ready: true,
    open: function(ioreq) {
        //get fp for given filename
        ioreq.fp = fs.getFilePointer(ioreq.data);
        switch(ioreq.mode) {
            case "r":
            case "r+":
                //ioreq.fp is undefined if file does not exist
                break;
            case "w":
            case "w+":
                if (ioreq.fp !== undefined) {
                    //file exists, delete it
                    delete fs.data[ioreq.data];
                }
                //create new empty file
                fs.data[ioreq.data] = "";
                ioreq.fp = fs.getFilePointer(ioreq.data);
                break;
            case "a":
            case "a+":
                if (ioreq.fp === undefined) {
                    //file does not exist, create new file
                    fs.data[ioreq.data] = "";
                }
                //set fp to end of file
                ioreq.fp = fs.getFilePointer(ioreq.data);
                ioreq.fp.index = fs.data[ioreq.data].length;
                break;
            default:
                //bad arg
                break;
        }
        ioreq.done = true;
        io.ready = true;
    },
    read: function(ioreq) {
        ioreq.data = new Array();
        for (var i = 0; i < ioreq.size; i++) {
            ioreq.data[i] = fs.getFileData(ioreq.fp);
            ioreq.fp.index = ioreq.fp.index + 1;    //incr fp
            if(ioreq.fp.eof) {
                break;
            }
        }
        ioreq.data = ioreq.data.join("");
        ioreq.done = true;
        io.ready = true;
    }, 
    write: function(ioreq) {
        for (var i = 0; i < ioreq.size; i++) {
            fs.setFileData(ioreq.fp, ioreq.data[i]);
            ioreq.fp.index = ioreq.fp.index + 1;    //incr fp
        }
        ioreq.done = true;
        io.ready = true;
    },
    getline: function(ioreq) {
        ioreq.data = new Array();
        for (var i = 0; i < ioreq.size; i++) {
            ioreq.data[i] = fs.getFileData(ioreq.fp);
            ioreq.fp.index = ioreq.fp.index + 1;    //incr fp
            if(ioreq.data[i] === '\n' || ioreq.fp.eof) {
                break;
            }
        }
        ioreq.data = ioreq.data.join("");
        ioreq.done = true;
        io.ready = true;
    }
};

//setTimeout(function, time-ms) after the time in millisec pass the function will trigger
function iodriver(ioreq) {
    io.ready = false;
    switch(ioreq.task) {
        case "open":
            setTimeout(function(){io.open(ioreq);}, Math.random()*1000);
            break;
        case "read":
            setTimeout(function(){io.read(ioreq);}, Math.random()*1000);
            break;
        case "write":
            setTimeout(function(){io.write(ioreq);}, Math.random()*1000);
            break;
        case "close":
            setTimeout(function(){io.close(ioreq);}, Math.random()*1000);
            break;
        case "getline":
            setTimeout(function(){io.getline(ioreq);}, Math.random()*1000);
            break;
    }
}
