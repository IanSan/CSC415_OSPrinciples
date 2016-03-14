function init() {
    //load all processes
    load(calcVectors);

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
