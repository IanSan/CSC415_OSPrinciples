function importScript(filename) {
    var js = document.createElement('script');
    js.type = "text/javascript";
    js.src = filename;
    document.head.appendChild(js);
}


//"print new line" in html doc
function log(string) {
    var newParagraph = document.createElement('p');
    newParagraph.textContent = "" + string;
    document.getElementById("log").appendChild(newParagraph);
};

var scripts = [
    'p1.js',
    'kernel.js'
];

scripts.forEach(function(element) {importScript(element);});
