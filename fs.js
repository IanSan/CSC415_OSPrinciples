var fs = {
    data: {
        "stdin": "this is from stdin",
        "stdout": "",
        "stderr": "",
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
        if (filepointer.index >=  fs.data[filepointer.filename].length) {
            filepointer.eof = -1;
        }
        return fs.data[filepointer.filename][filepointer.index];
    },
    setFileData: function(filepointer, char) {
        fs.data[filepointer.filename] =
                fs.data[filepointer.filename].substr(0,filepointer.index) +
                char +
                fs.data[filepointer.filename].substr(filepointer.index+1);
    },

};
