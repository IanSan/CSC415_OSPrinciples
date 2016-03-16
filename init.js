function init() {
    //load all processes
    load(display);

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
