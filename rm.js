fs.put("/rm", [
    [function(pcb, argv) {
        pcb.set("filename", pcb.get("argv")[1]);
    }, []],
    [remove, ["filename"]]
]);
