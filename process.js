//assoc array of variables declared in its scope
//if identifier is not found in the current scope, check the parent scope
function varlist(parentVarlist) {
    this.parent = parentVarlist;
}
varlist.prototype.setValue = function(identifier, value, scope) {
    if(scope === undefined) {
        scope = this;
    }
    if(identifier in scope) {
        return scope[identifier] = value;
    } else if(scope.parent !== undefined) { //not in scope, check parent
        return this.setValue(identifier, value, scope.parent);
    } else {    //set new variable in current scope
        return this[identifier] = value;
    }
};
varlist.prototype.getValue = function(identifier, scope) {
    if(scope === undefined) {
        scope = this;
    }
    if(identifier in scope) {
        return scope[identifier];
    } else if(scope.parent !== undefined) { //not in scope, check parent
        return this.getValue(identifier, scope.parent);
    } else {
        return undefined;
    }
};


//thread object
function Thread(process, parentThread, state, tid, routine, argv) {
    this.pcb = process;                 //PCB owning process
    this.parent = parentThread;         //Thread parent thread
    this.program = routine;             //program code
    this.state = state;                 //string process state
    this.pc = 0;                        //integer program counter
    this.tid = tid;                     //integer thread id
    this.children = new Array();        //children threads
    this.varlist = new varlist();       //empty varlist
    this.currVarlist = this.varlist;    //ref to current scope
    this.initializeVarlist(argv);
    this.fileList = this.pcb.fileList;
    this.workingdir = this.pcb.workingdir;
}
Thread.prototype.set = function(identifier, value) {
    return this.currVarlist.setValue(identifier, value);
};
Thread.prototype.get = function(identifier, value) {
    return this.currVarlist.getValue(identifier);
};
Thread.prototype.initializeVarlist = function(argv) {
    this.set("argv", argv);
    if (this.parent === undefined) {
        if (this.pcb.parent !== undefined) {
            this.set("stdin", this.pcb.parent.thread.get("stdin"));
            this.set("stdout", this.pcb.parent.thread.get("stdout"));
            this.set("stderr", this.pcb.parent.thread.get("stderr"));
        }
    } else {
        this.set("stdin", this.parent.get("stdin"));
        this.set("stdout", this.parent.get("stdout"));
        this.set("stderr", this.parent.get("stderr"));
    }
};
Thread.prototype.toString = function() {
    return "" + this.pcb.pid + " " + this.pcb.name + "<" + this.tid + ">";
};
Thread.prototype.createChild = function(program, name, state, pid, argv) {
    return new PCB(program, name, state, pid, this.pcb, argv);
};
Thread.prototype.stop = function() {
    this.state = "stop";
    if (this.pcb.parent !== undefined) {
        for (var i = 0; i < this.pcb.parent.children.length; i++) {
            if (this.pcb.parent.children[i] === this) {
                this.pcb.parent.children.splice(i, 1);
                break;
            }
        }
    }
};

//process control block object
//entry point is executed at this.thread
function PCB(program, name, state, pid, parent, argv) {
    this.program = program; //program code
    this.name = name;       //program name
    this.pid = pid;         //integer process id
    this.mode = 0;          //user/kernel mode
    this.parent = parent;   //parent process
    this.children = new Array();        //children process
    this.fileList = 
            this.parent === undefined ? new Array() : this.parent.fileList;
    if (this.parent !== undefined) {
        this.parent.children.push(this);
    }
    this.workingdir = 
            this.parent === undefined ? "/" : this.parent.workingdir;
    this.nexttid = 0;
    this.thread = new Thread(this, undefined, state, this.nexttid++, program, argv); //root thread
}
PCB.prototype.createChild = function(program, name, state, pid, argv) {
    return new PCB(program, name, state, pid, this, argv);
};
PCB.prototype.toString = function() {
    return "" + this.pid + " " + this.name;
};
