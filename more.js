fs.put(“/more”, [

[function(pcb, argv) {
        pcb.set("filename", pcb.get("argv”)[1]);
    }, []],
    [open, ["stdout", "w", "fp"]],
    [open, [“filename”,”r”, “fp”]],
    [read, ["filename”, “buffer”, 100]],
    [write, [“filename”,prompt]]
]);

/**
* Fake JavaScript file
*/

fs.put(“/text.txt”, “An operating system (OS) is system software that manages computer hardware and software resources and provides common services for computer programs. The operating system is a component of the system software in a computer system. Application programs usually require an operating system to function.”);
      

