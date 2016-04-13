function FileObject(meta, data) {
    this.meta = meta;
    this.data = data;
}

var fs = {
    data: {
        "/": new FileObject("drw-rw-rw-"),
        "/dev": new FileObject("drw-rw-rw-"),
    },
    
    put: function(path, data) {
        this.data[path] = new FileObject("-rw-rw-rw-", data);
    },
    
    /**
    *input: name of file 
    *outputs:filePointer, which is defined in file.js
    */
    getFilePointer: function(filename) {
        if(filename in fs.data) {
            return new FilePointer(filename);
        } else {
            //ERROR file not found
            return undefined;
        }
    },

    /**
    * Input: name of filePointer 
    * Output: the char at filepointer.index within the data of the file named filepointer.filename
    */
    getFileData: function(filepointer) {
        if(filepointer.filename.substr(0,5) === "/dev/") {
            var char = fs.data[filepointer.filename].data[filepointer.index];
            fs.data[filepointer.filename].data =
                    fs.data[filepointer.filename].data.substr(1);
            filepointer.index = -1;
            return char;
        }
        if (filepointer.index >=  fs.data[filepointer.filename].data.length) {
            filepointer.eof = -1;
        }
        return fs.data[filepointer.filename].data[filepointer.index];
    },
    setFileData: function(filepointer, char) {
        fs.data[filepointer.filename].data =
                fs.data[filepointer.filename].data.substr(0,filepointer.index) +
                char +
                fs.data[filepointer.filename].data.substr(filepointer.index+1);
    },

};
