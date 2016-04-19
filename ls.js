fs.put(	"/ls", 
	[    
	    [open, ["stdout", "w", "fp"]],
	    [set, ["files", ""]],
	    [set, ["workspace", ""]],
	    [function(pcb, argv) {
	            var args = pcb.get("argv");
	            args.shift();   //shifts out "echo"
	            args = args.join("");
	            if (args.length > 0) {
	                pcb.set("workspace", args);
	            }
    }, []],
	 	[fileList, ["files"]],
	    [write, ["fp", "files"]],
	    [close, ["fp"]]
	]
);
