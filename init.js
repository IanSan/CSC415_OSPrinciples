function init() {
    //load all processes
    load(p1);

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
