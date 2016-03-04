var fs = {
    data: {
        "file1.csv": "abcdef",
        "file2.csv": "ghijkl"
    },
    getFilePointer: function(filename) {
        if(filename in fs.data) {
            return FilePointer(filename);
        } else {
            //ERROR file not found
            return undefined;
        }
    },
    getFileData: function(filepointer) {
        return fs.data[filepointer.filename][filepointer.index];
    }
};
