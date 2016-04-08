var fs = {
    root: new FileObject("drw-rw-rw-", {
        "dev": new FileObject("drw-rw-rw-", {}),
    }),
    
    //puts data into contents of a new file at specificed path (absolute)
    put: function(path, data) {
        //resolve/create path
        if (path[0] !== "/") {
            //only absolute paths
            return;
        }
        path = path.split("/");
        var currDir = this.root;
        var i = 1;
        while (i < path.length - 1) {
            //if name exists
            if (path[i] in currDir.data) {
                //check it is a directory
                if (currDir.data[path[i]].meta[0] !== "d") {
                    //path resolution failed
                    return;
                }
            } else {
                //create new directory
                currDir.data[path[i]] = new FileObject("drw-rw-rw-", {});
            }
            currDir = currDir.data[path[i]];
            i++;
        }
        currDir.data[path[i]] = new FileObject("-rw-rw-rw-", data);
    },
    
    //returns FileObject at specified path (absolute)
    getFile: function(path) {
        //resolve
        if (path[0] !== "/") {
            //only absolute paths
            return undefined;
        }
        path = path.split("/");
        var currDir = this.root;
        var i = 1;
        while (i < path.length - 1) {
            //if directory exists
            if (!(path[i] in currDir.data) ||
                    (currDir.data[path[i]].meta[0] !== "d")) {
                return undefined;
            }
            currDir = currDir.data[path[i]];
            i++;
        }
        if (path[i] in currDir.data) {
            return currDir.data[path[i]];
        } else {
            return undefined;
        }
    },
    
    /**
    *input: name of file 
    *outputs:filePointer, which is defined in file.js
    */
    getFilePointer: function(filename) {
        var file = this.getFile(filename);
        if (file !== undefined) {
            return new FilePointer(file);
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
        if(filepointer.fileObject.meta[0] === "c") {
            var char = filepointer.fileObject.data[filepointer.index];
            filepointer.fileObject.data =
                    filepointer.fileObject.data.substr(1);
            filepointer.index = -1;
            return char;
        }
        if (filepointer.index >=  filepointer.fileObject.data.length) {
            filepointer.eof = -1;
        }
        return filepointer.fileObject.data[filepointer.index];
    },
    setFileData: function(filepointer, char) {
        filepointer.fileObject.data =
                filepointer.fileObject.data.substr(0,filepointer.index) +
                char +
                filepointer.fileObject.data.substr(filepointer.index+1);
    },

};
