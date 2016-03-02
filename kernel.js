// generic singly linked list container
function qCon(item, next) {
    this.item = item;
    this.next = next;
};


// process queue
var pq = {
    head: new qCon(),  // ref to head qCon
    tail: new qCon(),  // ref to tail qCon
    length: 0,   // length
    pop_front: function() {
        var oldHead = this.head;
        this.head = this.head.next;
        this.head.prev = 0;
        this.length--;
        if(this.length === 0) {
            this.tail = 0;
        }
        return oldHead.item;
    },
    push_back: function(pcb) {
        if(this.length === 0) {
            this.tail = new qCon(pcb, 0);
            this.head = this.tail;
        } else {
            var oldTail = this.tail;
            this.tail = new qCon(pcb, 0);
            oldTail.next = this.tail;
        }
        this.length++;
    }
};


// io request queue
var fq = {
    head: new qCon(),  // ref to head qCon
    tail: new qCon(),  // ref to tail qCon
    length: 0,   // length
    pop_front: function() {
        var oldHead = this.head;
        this.head = this.head.next;
        this.head.prev = 0;
        this.length--;
        if(this.length === 0) {
            this.tail = 0;
        }
        return oldHead.item;
    },
    push_back: function(pcb) {
        if(this.length === 0) {
            this.tail = new qCon(pcb, 0);
            this.head = this.tail;
        } else {
            var oldTail = this.tail;
            this.tail = new qCon(pcb, 0);
            oldTail.next = this.tail;
        }
        this.length++;
    }
};


function variable(identifier, data) {
    this.identifier = identifier;
    this.data = data;
}


function fileStruct(fp, flags) {
    this.fp = fp;
    this.flags = flags;
}


// creates process control block object
function pcb(program, state, pc, argc, argv) {
    this.program = program;
    this.state = state;
    this.pc = pc;
    this.pid = 0;   // unused positive integer
    this.mode = 0;  // user/kernel mode
    this.parent = 0;   //parent process
    this.children = 0; //children
    this.vars = 0; // array of variables
    this.argc = argc;
    this.argv = argv;
    this.files = 0;
};


// creates I/O request 
function ioreq(request, fp, filename) {
    this.request = request;
    this.data = 0;
    this.fp = fp;
    this.filename = filename;
}

// creates process
function load(program) {
    // create new pcb
    log("load process");
    pq.push_back(new pcb(program, "ready", 0, 0, 0));
    log(pq.tail.item.program);
};


function exec(pcb) {
    var code = pcb.program[pcb.pc];
    var cmd = code[0];
    switch(cmd) {
        case "open":
            var filename = code[1];
            var flags = code[2];
            var fp = code[3];
            if(pcb.state) {
                
                //incr pc
            } else {
                // give file to this process
                pcb.files.push(new fileStruct(0, flags));
                pcb.vars.push(new variable(fp, 0));
                // enqueue file req
                fq.push_back(new ioreq("open", fp, filename));
                // save PCB
                // changing to waiting
            }
            break;
    }
};


function kernel() {
    // load everything
    load(p1);
    
    // execute instructions of ready processes
    while(true) {
        // run next ready proc in queue
        while(pq.head.item.state === "ready") {
            pq.head.item.state = "running";
            exec(pq.head.item);
        }
        // move non-ready process to end of queue
        while(pq.head.state !== "ready") {
            pq.push_back(pq.pop_front());
        }
        // unload finished processes
    }
};


log("start kernel");
kernel();