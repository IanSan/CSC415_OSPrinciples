//FileStruct object
function FileStruct(filepointer, flags) {
    this.filepointer = filepointer;   //
    this.flags = flags;				  //permission type: read, write, readwrite

}


//FilePointer is an object composed of both the filename, which is
//the key to its data in the filesystem, and an index, indicating
//position within its data array
function FilePointer(filename, index) {
    this.filename;                                  //string filename
    this.index = index === undefined ? 0 : index;   //int
}

