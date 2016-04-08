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

