function init() {
    //load all processes
    load(classGrade);
    load(calcVectors);

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
