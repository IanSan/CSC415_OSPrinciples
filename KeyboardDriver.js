//waits for a control character, then writes data into dev/input
var keyboard = [
    [set, ["filename", "/dev/input"]],
    //create character device dev/input
    [function(pcb, argv) {
            fs.put("/dev/input", "", "crw-rw-rw-");
    }, []],
    [open, ["filename", "r+", "fp"]],   //create device dev/input
    //create textarea thats signal this process
    [function(pcb, argv) {
            var textarea = document.createElement("textarea");
            textarea.id = "keyboard";
            textarea.placeholder = "Type command here";
            textarea.autofocus = true;
            textarea.cols = 1;
            textarea.onkeypress =
                    function(event) {
                        if (event.keyCode === 13) { //wait for 'Enter' keypress
                            pcb.state = "ready";    //wake up this process
                        }
                    };
            var div = document.createElement("div");
            div.id = "currentLine";
            div.appendChild(textarea);
            document.body.appendChild(div);
            pcb.state = "waiting";  //wait for keypress event
    }, []],
//instr #4
    [function(pcb, argv) {
            var doc = document.getElementById("keyboard");
            var str = doc.value;
            doc.value = "";    //clear textarea
            pcb.set("buffer", str);
    }, []],
    [write, ["fp", "buffer"]],
    [function(pcb, argv) {
            pcb.pc = 3; //next instr 4
            pcb.state = "waiting";
    }, []]
];
