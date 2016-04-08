fs.put("/echo", [
    [open, ["stdout", "w", "fp"]],
    [set, ["buffer", ""]],
    [function(pcb, argv) {
            var args = pcb.get("argv");
            args.shift();   //shifts out "echo"
            args = args.join(" ");
            args = args + "\n";
            if (args.length > 0) {
                pcb.set("buffer", args);
            }
    }, []],
    [write, ["fp", "buffer"]],
    [close, ["fp"]]
]);
