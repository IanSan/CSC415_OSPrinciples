fs.put("/bin/rm", [
    [function(pcb, argv) {
        pcb.set("filename", pcb.get("argv")[1]);
    }, []],
    [remove, ["filename"]]
]);
