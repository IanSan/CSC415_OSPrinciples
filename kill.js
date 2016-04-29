fs.put("/bin/kill", [
    [open, ["stdout", "w", "fp"]],
    [set, ["buffer", ""]],
    [function(pcb, argv) {
            var args = pcb.get("argv");
            var pid = parseInt(args[1]);
            var str = "";
            if (isNaN(pid)) {
                //bad args
                str = "Usage: " + args[0] + " pid\n";
            } else {
                var processes = pq.iterate();
                var i;
                for (i = 0; i < processes.length; i++) {
                    if (processes[i].pid === pid) {
                        processes[i].stop();
                        break;
                    }
                }
                if (i === processes.length) {
                    str = "Process " + pid + " not found.\n";
                } else {
                    str = "Killed " + pid + ".\n";
                }
            }
            pcb.set("buffer", str);
    }, []],
    [write, ["fp", "buffer"]],
    [close, ["fp"]]
]);
