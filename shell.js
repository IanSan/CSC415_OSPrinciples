var shell = [
    [set, ["filename", "dev/input"]],
    [open, ["filename", "r", "fp"]],
    [set, ["filename", "dev/tty0"]],
    [open, ["filename", "r+", "fp2"]],
//loop
    [read, ["fp", "buffer", 100]],
    [write, ["fp2", "buffer"]], //echo keystrokes
    [set, ["argv", ""]],    //argv for process to be executed
    //parse input, split tokens by whitespace and store in "argv"
    [function(pcb, argv) {
            if(pcb.get("buffer").length === 0) {
                pcb.pc = 3;
                return;
            }
            var args = pcb.get("buffer").split(/[ \n]+/);
            pcb.set("argv", args);
    }, []],
    //validate tokens, "argv"[0] should be a valid command
    [function(pcb, argv) {
            var command = pcb.get("argv")[0];
            if(command.length === 0) {
                //empty string
                pcb.set("buffer", "");
            } else if(command in fs.data) {
                //executable file
                pcb.set("buffer", "");
                pcb.pc = pcb.pc + 2;    //goto execute
            } else {
                var str = "";
                //interpret shell-specific commmands here
                switch(command) {
                    case "exit":
                    default:
                        str = command + ": command not found\n";
                        break;
                }
                pcb.set("buffer", str);
            }
    }, []],
    [write, ["fp2", "buffer"]],
//goto loop
    [function(pcb, argv) {
            pcb.pc = 3; //next instr 2
    }, []],
//execute
    //find file in filesystem and execute, pass arguments
    [createChildProcess, ["argv"]],
//goto loop
    [function(pcb, argv) {
            pcb.pc = 3; //next instr 2
    }, []]
];
