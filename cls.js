//clears html element display
fs.put("/cls", [
    [function(pcb, argv) {
            var doc = document.getElementById('display');
            doc.innerHTML = "";
    }, []]
]);
