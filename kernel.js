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
function IORequest(task, pcb, fp, data) {
    this.task = task;
    this.pcb = pcb;     //ref of requesting process
    this.fp = fp;       //file pointer
    this.data = data;
    this.done = false;  //boolean has this request been responded to?
};

//return data to I/O requester
function ioreturn(ioreq) {
    var argv = ioreq.pcb.program[ioreq.pcb.pc];
    //update variable assignment
    switch(argv[0]) {
        case "open":
            ioreq.pcb.currVarlist.setValue(argv[3], ioreq.fp);
            break;
        case "read":
            ioreq.pcb.currVarlist.setValue(argv[3], ioreq.data);
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
    var pcb.state = "running";
    var argv = pcb.program[pcb.pc];
    var cmd = argv[0];
    switch(cmd) {
        case "open":
            fq.push_back(new IORequest(cmd, pcb, undefined, argv[1]));
            console.log("process change state running to waiting for " + cmd);
            pcb.state = "waiting";
            break;
        case "read":
            fq.push_back(new IORequest(cmd, pcb, argv[1], undefined));
            console.log("process change state running to waiting for " + cmd);
            pcb.state = "waiting";
            break;
        case "write":

            console.log("process change state running to waiting for " + cmd);
            pcb.state = "waiting";
            break;
        case "close":

            console.log("process change state running to waiting for " + cmd);
            pcb.state = "waiting";
            break;
        case "set":
            pcb.currVarlist.setValue(argv[1], argv[2]);
            console.log("process change state running to ready for " + cmd);
            pcb.state = "ready";
            break;
        case "add":
            pcb.currVarlist.setValue(argv[1], pcb.currVarlist.getValue[argv[2]] + pcb.currVarlist.getValue[argv[3]]);
            console.log("process change state running to ready for " + cmd);
            pcb.state = "ready";
            break;
        case "do":
            break;
        case "while":
            break;
        default:
            console.log("exec error: cannot find cmd :" + cmd);//ERROR
            break;
    }
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
    //load everything
    load(p1);
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