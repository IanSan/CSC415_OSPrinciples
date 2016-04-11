fs.put("/cp", [
    [open, ["stdout", "w", "fp"]],
    [set, ["buffer", ""]],
    [function(pcb, argv) {
        var args = pcb.get("argv");
        args = args.join(" ");
        args = args + "\n";
        if (args.length > 0) {
            pcb.set("buffer", args);
        }
    }, []],
    [open, ["fp", "buffer"]],
    [open, ["fp", "buffer"]],
    [write, ["fp", "buffer"]],
    [close, ["fp"]],
    [close, ["fp"]]
]);
