//waits for a control character, then sends data
fs.data["dev/input"] = "";

var keyboard = [
    [set, ["filename", "dev/input"]],
    [open, ["filename", "w", "fp"]],   //create device dev/input
    [function(pcb, argv) {
            var doc = document.getElementById('keyboard');
            var str = doc.value;
            doc.value = '';    //clear textarea
            pcb.set("buffer", str);
    }, []],
    [write, ["fp", "buffer", 100]],
    // need a way to signal this process to wake upon keypresses
    /*[function(pcb, argv) {
            pcb.pc = 0; //next instr 1 function
            pcb.state = "waiting";
    }, []]*/
];
