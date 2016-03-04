var fs = {
    data: {
        "file1.csv": "abcdef",
        "file2.csv": "ghijkl"
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
        return fs.data[filepointer.filename][filepointer.index];
    },
    setFileData: function(filepointer) {
        return fs.data[filepointer.filename][filepointer.index];
    },

};
