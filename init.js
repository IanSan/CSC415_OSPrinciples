function init() {
    //load all processes
    load(calcVectors);
    load(classGrade);

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
