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
function IORequest(task, pcb, varId, fp, data, size) {
    this.task = task;
    this.pcb = pcb;     //ref of requesting process
    this.varId = varId; //string identifier of variable to be set
    this.fp = fp;       //file pointer
    this.data = data;
    this.size = size;   //number of chars to read/write
    this.done = false;  //boolean has this request been responded to?
};

//return data to I/O requester
function ioreturn(ioreq) {
    //update variable assignment
    switch(ioreq.task) {
        case "open":
            ioreq.pcb.currVarlist.setValue(ioreq.varId, ioreq.fp);
            break;
        case "read":
            ioreq.pcb.currVarlist.setValue(ioreq.varId, ioreq.data);
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
function open(pcb, argv){
    fq.push_back(new IORequest("open", pcb,
            argv[2],    //var identifier to be set with fp
            undefined,  //no given fp
            argv[0]));  //filename
    console.log("process change state running to waiting for open");
    pcb.state = "waiting";
}

function close(pcb, argv){

}

function read(pcb, argv){
    console.log("process change state running to waiting for read");
    fq.push_back(new IORequest("read", pcb,
            argv[2],    //var identifier
            pcb.currVarlist.getValue(argv[0]),  //fp
            undefined,  //data
            argv[1]));  //size
    pcb.state = "waiting";
}

function write(pcb, argv){
    console.log("process change state running to waiting for write");
    fq.push_back(new IORequest("write", pcb,
            undefined,  //no variable to set
            pcb.currVarlist.getValue(argv[0]),  //fp
            argv[1],    //data
            argv[1].length));   //size
    pcb.state = "waiting";
}

 function set(pcb, argv){
    pcb.currVarlist.setValue(argv[0], argv[1]);
    console.log("process change state running to ready for set");
    pcb.state = "ready";
}
function add(pcb, argv){
    pcb.currVarlist.setValue(argv[0], pcb.currVarlist.getValue[argv[2]] + pcb.currVarlist.getValue[argv[3]]);
    console.log("process change state running to ready for add");
    pcb.state = "ready";
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
    var line = pcb.program[pcb.pc];
    //line[0] must be a function object && line[1] is the array of arguments for function
    line[0](pcb, line[1]);
    //increment pc
    pcb.pc = pcb.pc + 1; 
    //end of process file then will delete
    if (pcb.length-1 < pcb.pc ) {
        console.log("process change state running to stop");
        pcb.state = "stop";
    }
};


function kernel() {
    console.log("kernel started");
    //execute instructions of ready processes
    while(true) {
        //run next ready proc in queue
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
    }
};