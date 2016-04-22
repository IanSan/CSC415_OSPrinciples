var initprocess = [
    [set, ["wd", "/"]],
    [chdir, ["wd"]],
    [set, ["argv", ["/bin/keyboard"]]],
    [createChildProcess, ["argv"]],
    [set, ["argv", ["/bin/display"]]],
    [createChildProcess, ["argv"]],
    [set, ["argv", ["/bin/shell"]]],
    [createChildProcess, ["argv"]]
];

fs.put("/bin/init", initprocess);

function init() {
    //load all processes
    load(initprocess, "init");

    //start kernel
    console.log("kernel starting");
    setTimeout(function(){kernel();}, 0);
};
