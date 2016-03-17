//FileStruct object
function FileStruct(filepointer, mode) {
    this.filepointer = filepointer; //FilePointer object
    this.mode = mode;               //string file access mode
}


//FilePointer is an object composed of both the filename, which is
//the key to its data in the filesystem, and an index, indicating
//position within its data array
function FilePointer(filename, index) {
    this.filename = filename;                       //string filename
    this.index = index === undefined ? 0 : index;   //int
    this.eof = 0;                                   //int sets to -1 if EOF
}

