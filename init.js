function init() {
    //load all processes
    load(display, "display");
    load(keyboard, "keyboard");
    load(shell, "shell");

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
