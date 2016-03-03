//assoc array of variables declared in its scope
//if identifier is not found in the current scope, check the parent scope
function varlist(parentVarlist) {
    this.parent = parentVarlist;
}
varlist.prototype.setVar = function(identifier, value, scope) {
    if(scope === undefined) {
        scope = this;
    }
    if(identifier in scope) {
        return scope[identifier] = value;
    } else if(scope.parent !== undefined) { //not in scope, check parent
        return this.setVar(identifier, value, scope.parent);
    } else {    //set new variable in current scope
        return this[identifier] = value;
    }
};
varlist.prototype.getVar = function(identifier, scope) {
    if(scope === undefined) {
        scope = this;
    }
    if(identifier in scope) {
        return scope[identifier];
    } else if(scope.parent !== undefined) { //not in scope, check parent
        return this.getVar(identifier, scope.parent);
    } else {
        return undefined;
    }
};


//process control block object
function PCB(program, state, pid, parent) {
    this.program = program; //program code
    this.sState = state;    //string process state
    this.pc = 0;            //integer program counter
    this.pid = pid;         //integer process id
    this.mode = 0;          //user/kernel mode
    this.parent = parent;   //parent process
    this.children;          //children process
    this.varlist = new varlist(
            this.parent === undefined ? undefined : this.parent.currVarlist);
    this.currVarlist = this.varlist;    //ref to current scope
}
