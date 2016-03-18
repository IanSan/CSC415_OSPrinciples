ls.js

//list the processes running
var ls = function (pcb, argv){
	var ioreq = new IORequest("fileList", pcb);
 	ioreq.fp = pcb.get(argv[0]);            //_var filepointer
 	ioreq.data = pcb.get(argv[1]);          //_var stringBuffer
    ioreq.size = pcb.get(argv[1]).length;   //int size
    fq.push_back(ioreq);
	pcb.state = "waiting"; 
}