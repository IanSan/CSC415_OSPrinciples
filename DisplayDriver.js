//occasionally flushes tty0 and prints to display (html)
fs.put("/bin/display", [
    [set, ["filename", "/dev/tty0"]],
    //create character device dev/tty0
    [function(pcb, argv) {
            fs.put("/dev/tty0", "", "crw-rw-rw-");
    }, []],
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
            pcb.pc = 2; //next instr 3
    }, []]
]);
