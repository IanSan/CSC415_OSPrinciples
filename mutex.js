function Mutex() {
    this.locked = false;            //bool mutex lock
    this.owner;                     //owning thread
    this.waitList = new Queue();    //queue of threads waiting for lock
}

function Semaphore(value) {
    this.value = value;
    this.waitList = new Queue();
}
