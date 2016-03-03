//process queue
var pq = new Queue();

//io request queue
var fq = new Queue();

//create new process
function load(program) {
    pq.push_back(new PCB(program, "ready", 0, undefined));
    console.log("loaded process");
    console.log(pq.tail.object.program);
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
            ioreq.pcb.currVarlist.setVar(argv[3], ioreq.fp);
            break;
        case "read":
            ioreq.pcb.currVarlist.setVar(argv[3], ioreq.data);
            break;
        case "write":
            break;
        case "close":
            break;
        default:
            console.log("IO Return Error");
    }
    //increment pc and set ready
    ioreq.pcb.pc = ioreq.pcb.pc + 1;
    ioreq.pcb.state = "ready";
}


//execute process instruction
function exec(pcb) {
    var argv = pcb.program[pcb.pc];
    var cmd = argv[0];
    switch(cmd) {
        case "open":
            fq.push_back(new IORequest(cmd, pcb, undefined, argv[1]));
            pcb.state = "waiting";
            break;
        case "read":
            fq.push_back(new IORequest(cmd, pcb, argv[1]));
            pcb.state = "waiting";
            break;
        case "write":
            break;
        case "close":
            break;
        case "set":
            pcb.currVarlist.setVar(argv[1], argv[2]);
            break;
        case "add":
            pcb.currVarlist.setVar(argv[1], pcb.currVarlist.getVar[argv[2]] + pcb.currVarlist.getVar[argv[3]]);
            break;
        default:
            //ERROR
            break;
    }
};


function kernel() {
    console.log("kernel started");
    //load everything
    load(p1);
    
    //execute instructions of ready processes
    while(true) {
        //run next ready proc in queue
        while(!pq.isEmpty() && pq.front().state === "ready") {
            exec(pq.front());
        }
        //move process to end of queue
        if(!pq.isEmpty() && pq.front().state === "terminated") {
            pq.pop_front();
        } else {
            pq.push_back(pq.pop_front());
        }
        
        //unload finished processes
        while(!pq.isEmpty() && pq.front().state === "terminated") {
            pq.pop_front();
        }
        
        //run io driver
        while(io.ready && !fq.isEmpty() && !fq.front().done) {
            iodriver(fq.front());
        }
        //return finished io requests
        while(!fq.isEmpty() && fq.front().done) {
            //return data to requesting process
            //remove io request
            ioreturn(fq.pop_front());
        }
    }
};
