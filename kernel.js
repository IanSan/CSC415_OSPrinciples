//process queue
var pq = new Queue();

//io request queue
var fq = new Queue();

//create new process
var programCounter = 0;
function load(program) {
    pq.push_back(new PCB(program, "start", programCounter, undefined));
    console.log("start process"+ programCounter);
    console.log(pq.tail.object.program);
    programCounter++;
};

//I/O request object
function IORequest(task, pcb) {
    this.task = task;
    this.pcb = pcb;     //ref of requesting process
    this.varId;         //string identifier of variable to be set
    this.fp;            //FilePointer object
    this.data;
    this.size;          //int number of chars to read/write
    this.mode;          //string file access mode
    this.done = false;  //boolean has this request been responded to?
};

//return data to I/O requester
function ioreturn(ioreq) {
    //update variable assignment
    switch(ioreq.task) {
        case "open":
            //set _var with FilePointer
            ioreq.pcb.set(ioreq.varId, ioreq.fp);
            //add file to this process's list of open files
            ioreq.pcb.fileList.push(new FileStruct(ioreq.fp, ioreq.mode));
            break;
        case "read":
        case "getline":
            ioreq.pcb.set(ioreq.varId, ioreq.data);
            break;
        case "write":
            break;
        case "close":
            break;
        default:
            console.log("IO Return Error");
    }
    ioreq.pcb.state = "ready";   
}

//====EXEC COMMANDS============================================
// some definitions for our own sanity
// _var : a string in user programs, but interpreted as a variable identifier

//  [open, [_var filename, string flags, _var filepointer]]
// Opens a file with the name set in _var filename with given permission flags
// and sets filepointer
function open(pcb, argv){
    var ioreq = new IORequest("open", pcb);
    ioreq.data = pcb.get(argv[0]);   //_var filename
    ioreq.mode = argv[1];   //string file access mode
    ioreq.varId = argv[2];  //_var identifier to be set with fp
    fq.push_back(ioreq);
    console.log("process change state running to waiting for open");
    pcb.state = "waiting";
}

//  [close, [_var filepointer]]
// Closes file corresponding to filepointer
function close(pcb, argv){
    //remove file from this process's list of open files
    var fp = pcb.get(argv[0]);
    for (var i = 0; i < pcb.fileList.length; i++) {
        if (pcb.fileList[i].filepointer === fp) {
            pcb.fileList.splice(i, 1);
            break;
        }
    }
}

//  [read, [_var filepointer, _var stringBuffer, int size]]
// Sets buffer with size number of characters starting at where filepointer is
// at. Increments filepointer to one past the last read character.
function read(pcb, argv){
    var fp = pcb.get(argv[0]);
    var mode;
    for (var i = 0; i < pcb.fileList.length; i++) {
        if (pcb.fileList[i].filepointer === fp) {
            mode = pcb.fileList[i].mode;
            break;
        }
    }
    if (mode[0] !== "r" && mode[1] !== "+") {
        console.log("read permission error");
        return 1;
    }
    var ioreq = new IORequest("read", pcb);
    ioreq.fp = pcb.get(argv[0]);    //_var filepointer
    ioreq.varId = argv[1];          //_var identifier to be set with string
    ioreq.size = argv[2];           //int size
    fq.push_back(ioreq);
    console.log("process change state running to waiting for read");
    pcb.state = "waiting";
}

//  [write, [_var filepointer, _var stringBuffer]]
// Writes buffer to where filepointer is at. If fp is not at the end of the file,
// this will replace any existing data at that position. Increments filepointer
// to one past the last written character.
function write(pcb, argv){
    var fp = pcb.get(argv[0]);
    var mode;
    for (var i = 0; i < pcb.fileList.length; i++) {
        if (pcb.fileList[i].filepointer === fp) {
            mode = pcb.fileList[i].mode;
            break;
        }
    }
    if (mode === "r") {
        console.log("write permission error");
        return 1;
    }
    var ioreq = new IORequest("write", pcb);
    ioreq.fp = pcb.get(argv[0]);            //_var filepointer
    ioreq.data = pcb.get(argv[1]);          //_var stringBuffer
    ioreq.size = pcb.get(argv[1]).length;   //int size
    fq.push_back(ioreq);
    console.log("process change state running to waiting for write");
    pcb.state = "waiting";
}

//  [getline, [_var stringBuffer, int size, _var filepointer]]
// Reads from file into buffer until a newline is found or size number of
// characters are read. Newline is included in buffer if one was found.
function getline(pcb, argv) {
    var fp = pcb.get(argv[2]);
    var mode;
    for (var i = 0; i < pcb.fileList.length; i++) {
        if (pcb.fileList[i].filepointer === fp) {
            mode = pcb.fileList[i].mode;
            break;
        }
    }
    if (mode[0] !== "r" && mode[1] !== "+") {
        console.log("read permission error");
        return 1;
    }
    var ioreq = new IORequest("getline", pcb);
    ioreq.varId = argv[0];          //_var identifier to be set with string
    ioreq.size = argv[1];           //int size
    ioreq.fp = pcb.get(argv[2]);    //_var filepointer
    fq.push_back(ioreq);
    console.log("process change state running to waiting for getline");
    pcb.state = "waiting";
}

 function set(pcb, argv){
    pcb.set(argv[0], argv[1]);
}
function add(pcb, argv){
    pcb.set(argv[0],
            pcb.get[argv[1]] +
            pcb.get[argv[2]]);
}

//  [createChildProcess, [_var argv]]
// Creates child process, executing the program with filename given in _var
// argv[0]. All argument argv are passed to the new process.
function createChildProcess(pcb, argv) {
    argv = pcb.get(argv);
    if(fs.data[argv[0]] === undefined) {
        return;
    }
    var program = fs.data[argv[0]];
    var child = pcb.createChild(program, "ready", programCounter++, argv);
    pq.push_back(child);
}


//=============================================================

//execute process instruction
/** structure of process code should be the following: 
* open-theCMD, desiredFile, fileFlag, addressOfLocation
* read-theCMD, addressofLocation, null, desiredDestination
* write 
* close 
* add
*/
function exec(pcb) {
    console.log("process change state "+pcb.state+" to running for exec");
    pcb.state = "running";
    while(pcb.state === "running") {
        var line = pcb.program[pcb.pc];
        //line[0] must be a function object && line[1] is the array of arguments for function
        line[0](pcb, line[1]);
        //increment pc
        pcb.pc = pcb.pc + 1; 
        //end of process file then will delete
        if(pcb.pc >= pcb.program.length) {
            console.log("process change state running to stop");
            pcb.stop();
        }
    }
};


function kernel() {
    //main kernel loop
    //while(!pq.isEmpty()) {
        //execute instructions of ready process
        if(!pq.isEmpty() && pq.front().state === "ready" || pq.front().state === "start") {
            exec(pq.front());
        }
        
        //move process to end of queue
        if(!pq.isEmpty() && pq.front().state === "stop") {
            console.log("finished "+ pq.front().pid );
            pq.pop_front();
        } else {
            pq.push_back(pq.pop_front());
        }
        
        //unload finished processes
        while(!pq.isEmpty() && pq.front().state === "stop") {
            console.log("finished "+ pq.front().pid );
            pq.pop_front();
        }
        
        //run io driver
        while(io.ready && !fq.isEmpty() && !fq.front().done) {
            iodriver(fq.front());
        }

        //return finished io requests
        while(!fq.isEmpty() && fq.front().done) {
            //return data to requesting process & remove io request
            ioreturn(fq.pop_front());
        }
        
        setTimeout(function(){kernel();}, 0);
        //because javascript is single-threaded
        //stop this line of execution and then restart it
        //calling kernel() emulates while(!pq.isEmpty()) {...}
        /*if(pq.isEmpty()) {
            console.log("all processes stopped, kernel stopped");
        } else {
        }*/
    //}
};
