//clears html element display
fs.put("/bin/cls", [
    [function(pcb, argv) {
            var doc = document.getElementById('display');
            doc.innerHTML = "";
    }, []]
]);
