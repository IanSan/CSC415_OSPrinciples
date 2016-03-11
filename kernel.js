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
function IORequest(task, pcb, fp, data, size) {
    this.task = task;
    this.pcb = pcb;     //ref of requesting process
    this.fp = fp;       //file pointer
    this.data = data;
    this.size = size;   //number of chars to read/write
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
    pcb.state = "running";
    var line = pcb.program[pcb.pc];
    //line[0] must be a function object
    //line[1] is the array of arguments for function
    line[0](line[1]);
    
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