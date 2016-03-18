var shell = [
    [set, ["filename", "dev/input"]],
    [open, ["filename", "r", "fp"]],
    [set, ["filename", "dev/tty0"]],
    [open, ["filename", "r+", "fp2"]],
//loop
    [read, ["fp", "buffer", 100]],
    [write, ["fp2", "buffer"]], //echo keystrokes
    //process command
    [function(pcb, argv) {
            if(pcb.get("buffer").length === 0)
                return;
            var args = pcb.get("buffer").substr(0, pcb.get("buffer").length-1).split(" ");
            var str = "";
            //find file in filesystem and execute, pass arguments
            //load(fs.data[args[0]]);
            
            //args[0] Command Instruction , arg[1] for string 
            str += args[0](args[1]);

            switch(args[0]) {
                case "echo":
                    for (var i = 1; i < args.length; i++) {
                        str = str + args[i];
                    }
                    break;
                default:
                    str = args[0] + " is not a valid command\n";
                    break;
            }
            pcb.set("buffer", str);
    }, []],
    [write, ["fp2", "buffer"]],
//goto loop
    [function(pcb, argv) {
            pcb.pc = 1; //next instr 2
    }, []]
];
