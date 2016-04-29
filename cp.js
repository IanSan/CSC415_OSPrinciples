fs.put("/bin/cp", [
    [open, ["stdout", "w", "fp"]],
    [set, ["buffer", ""]],
    [function(pcb, argv) {

        pcb.set("file1", pcb.get("argv")[1])
        pcb.set("file2", pcb.get("argv")[2])

    }, []],
    [open, ["file1", "r", "fp"]],
    [open, ["file2", "w", "fp1"]],
    [read, ["fp", "buffer", 100]],
    [write, ["fp1", "buffer", 100]],
    [close, ["fp"]],
    [close, ["fp1"]]
]);
