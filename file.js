//FileStruct object
function FileStruct(filepointer, mode) {
    this.filepointer = filepointer; //FilePointer object
    this.mode = mode;               //string file access mode
}

//FileObject with properties of metadata (meta) and the actual contents (data)
function FileObject(meta, data) {
    this.meta = meta;
    this.data = data;
}

//FilePointer is an object composed of a FileObject and an index, indicating
//position within its data array
function FilePointer(fileObject, index) {
    this.fileObject = fileObject;                   //FileObject
    this.index = index === undefined ? 0 : index;   //int
    this.eof = 0;                                   //int sets to -1 if EOF
}

function resolvePath(path, startingDirectory) {
    var resolvedPath = path;
    if (path[0] !== "/") {
        //resolve relative path to absolute
        //add trailing slash
        if (startingDirectory[startingDirectory.length - 1] !== "/") {
            startingDirectory = startingDirectory + "/";
        }
        resolvedPath = startingDirectory + path;
    }
    //add trailing slash for pattern
    if (resolvedPath[resolvedPath.length - 1] !== "/") {
        resolvedPath = resolvedPath + "/";
    }
    
    //resolve . and ..
    //replace /./ with /
    resolvedPath = resolvedPath.replace(/\/\.\//g, "/");
    //replace /dir/../ with /
    resolvedPath = resolvedPath.replace(/\/[A-Za-z0-9]+\/\.\.\//g, "/");
    
    //remove trailing slash (unless this is root /)
    if (resolvedPath[resolvedPath.length - 1] === "/" && resolvedPath !== "/") {
        resolvedPath = resolvedPath.substr(0, resolvedPath.length - 1);
    }
    return resolvedPath;
}
