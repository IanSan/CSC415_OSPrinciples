//occasionally flushes tty0 and prints to display (html)
var display = [
    [open, ["dev/tty0", "w", "fp"]],   //create device dev/ttyS0
    [close, ["fp"]],
    [open, ["dev/tty0", "r", "fp"]],
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
            pcb.pc = 2; //next instr 3
    }, []]
];
