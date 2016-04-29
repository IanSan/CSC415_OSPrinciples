fs.put("/bin/cat", [
    [set, ["buffer", ""]],
    [open, ["stdout", "w", "out"]],
    [function(pcb, argv) {
            pcb.set("filename", pcb.get("argv")[1]);
    }, []],
    [open, ["filename", "r", "fp"]],
    [function(pcb, argv) {
            if (pcb.get("fp") === undefined) {
                pcb.set("buffer", "Could not open " + pcb.get("filename") + "\n");
                pcb.pc = pcb.pc + 3;
            }
    }, []],
    [getline, ["buffer", 100, "fp"]],
    [write, ["out", "buffer"]],
    [function(pcb, argv) {
            if (pcb.get("fp").eof === 0) {
                pcb.pc = pcb.pc - 3;
            } else {
                pcb.pc = pcb.pc + 1;
            }
    },[]],
    [write, ["out", "buffer"]],
    [close, ["out"]],
    [close, ["fp"]]
]);
