//occasionally flushes tty0 and prints to display (html)
var display = [
    [set, ["filename", "/dev/tty0"]],
    [open, ["filename", "w", "fp"]],   //create device dev/ttyS0
    [close, ["fp"]],
    [open, ["filename", "r", "fp"]],
//loop:
    [read, ["fp", "buffer", 100]],
    [function(pcb, argv) {
            var str = pcb.get("buffer");
            if (str.length > 0) {
                str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
                var doc = document.getElementById('display');
                doc.innerHTML = doc.innerHTML + str;
            }
    }, []],
//goto loop
    [function(pcb, argv) {
            pcb.pc = 3; //next instr 4
    }, []]
];
