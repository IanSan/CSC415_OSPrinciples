fs.put("/cp", [
    [open, ["stdout", "w", "fp"]],
    [set, ["buffer", ""]],
    [function(pcb, argv) {
        var args = pcb.get("argv");
        args.shift();
        args = args.join(" ");
        args = args + "\n";
        if (args.length > 0) {
            pcb.set("buffer", args);
        }
        pcb.set("file1", pcb.get("argv")[1])
        pcb.set("file2", pcb.get("argv")[2])

    }, []],
    [open, ["fp", "file1"]],
    [open, ["fp", "file2"]],
        [read, ["fp", "file1"]],
    [write, ["fp", "file2"]],
    [close, ["file1"]],
    [close, ["file2"]]
]);
