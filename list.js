//generic doubly linked list container
function Node(object, next, prev) {
    this.object = object;
    this.next = next;
    this.prev = prev;
}


//FIFO queue
function Queue() {
    this.head;       //ref to head qCon
    this.tail;       //ref to tail qCon
    this.length = 0; //length
}
Queue.prototype.isEmpty = function() {
    if(this.length > 0)
        return false;
    return true;
};
Queue.prototype.front = function() {
    if(this.head === undefined)
        return undefined;
    return this.head.object;
};
Queue.prototype.pop_front = function() {
    var oldHeadObject = this.head.object;
    this.head = this.head.next;
    this.length--;
    //alternatively if length === 0
    if(this.head === undefined) {
        this.tail = undefined;
    }
    return oldHeadObject;
};

Queue.prototype.push_back = function(object) {
    if(this.length === 0) {
        this.tail = new Node(object);
        this.head = this.tail;
    } else {
        this.tail.next = new Node(object);
        this.tail = this.tail.next;
    }
    this.length++;
};

Queue.prototype.iterate = function(){
    var proc_list = [], currNode;
    proc_list[0] = this.head.object;
	 currNode = this.head;
    var i;
    for(i=1; i<this.length; i++) {
		  currNode = currNode.next;
        proc_list[i] = currNode.object;
    }
    return proc_list;
};