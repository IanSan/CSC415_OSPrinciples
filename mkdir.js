fs.put("/bin/mkdir", [[function(pcb, argv) {
        var newdir = pcb.get("argv")[1];
        if (newdir.length > 0) {
            pcb.set("name", newdir);
        } else {
            pcb.pc = pcb.pc + 1;
        }
    }, []],
    [mkdir, ["name"]]
]);