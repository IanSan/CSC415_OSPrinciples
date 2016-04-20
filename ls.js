fs.put("/ls", [
    [open, ["stdout", "w", "fp"]],
    [function(pcb, argv) {
            var args = pcb.get("argv");
            args.shift();
            if (args.length > 1) {
                pcb.set("dir", args[0]);
            } else {
                pcb.set("dir", pcb.workingdir);
            }
    }, []],
    [readdir, ["dir", "list"]],
    [function(pcb, argv) {
            var list = pcb.get("list");
            var str = "";
            for (var i = 0; i < list.length; i++) {
                if (str.length + list[i].length > 80) {
                    str = str + "\n" + list[i] + " ";
                } else {
                    str = str + list[i] + " ";
                }
            }
                    str = str + "\n";
            pcb.set("buffer", str);
    }, []],
    [write, ["fp", "buffer"]],
    [close, ["fp"]]
]);
