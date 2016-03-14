function init() {
    //load all processes
    load(classGrade);

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
}
