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


//process control block object
function PCB(program, name, state, pid, parent, argv) {
    this.program = program; //program code
    this.name = name;       //program name
    this.state = state;     //string process state
    this.pc = 0;            //integer program counter
    this.pid = pid;         //integer process id
    this.mode = 0;          //user/kernel mode
    this.parent = parent;   //parent process
    this.children = new Array();        //children process
    this.varlist = new varlist();       //empty varlist
    this.currVarlist = this.varlist;    //ref to current scope
    this.initializeVarlist(argv);
    this.fileList = 
            this.parent === undefined ? new Array() : this.parent.fileList;
    if (this.parent !== undefined) {
        this.parent.children.push(this);
    }
    this.workingdir = 
            this.parent === undefined ? "/" : this.parent.workingdir;
}
PCB.prototype.set = function(identifier, value) {
    return this.currVarlist.setValue(identifier, value);
};
PCB.prototype.get = function(identifier, value) {
    return this.currVarlist.getValue(identifier);
};
PCB.prototype.initializeVarlist = function(argv) {
    this.set("argv", argv);
    if (this.parent !== undefined) {
        this.set("stdin", this.parent.get("stdin"));
        this.set("stdout", this.parent.get("stdout"));
        this.set("stderr", this.parent.get("stderr"));
    }
};
PCB.prototype.createChild = function(program, name, state, pid, argv) {
    return new PCB(program, name, state, pid, this, argv);
};
PCB.prototype.stop = function() {
    this.state = "stop";
    if (this.parent !== undefined) {
        for (var i = 0; i < this.parent.children.length; i++) {
            if (this.parent.children[i] === this) {
                this.parent.children.splice(i, 1);
                break;
            }
        }
    }
};
PCB.prototype.toString = function() {
    return "" + this.pid + " " + this.name;
};
