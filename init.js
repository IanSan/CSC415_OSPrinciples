function init() {
    //load all processes
    load(display);
    load(shell);

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
