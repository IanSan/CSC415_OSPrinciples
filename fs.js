function FileObject(meta, data) {
    this.meta = meta;
    this.data = data;
}

var fs = {
    root: new FileObject("drw-rw-rw-", {
        "dev": new FileObject("drw-rw-rw-", {}),
    }),
    
    //puts data into contents of a new file at specificed path (absolute)
    //file is not overwritten if name already exists
    put: function(path, data, meta) {
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
        if (!(path[i] in currDir.data)) {
            if (meta === undefined) {
                meta = "-rw-rw-rw-";
            }
            currDir.data[path[i]] = new FileObject(meta, data);
        }
    },
    
    //delete normal files
    remove: function(path) {
        //resolve
        if (path[0] !== "/") {
            //only absolute paths
            return;
        }
        path = path.split("/");
        var currDir = this.root;
        var i = 1;
        while (i < path.length - 1) {
            //if directory does not exist
            if (!(path[i] in currDir.data) ||
                    (currDir.data[path[i]].meta[0] !== "d")) {
                //path resolution failed
                return;
            }
            currDir = currDir.data[path[i]];
            i++;
        }
        if (path[i] in currDir.data && currDir.data[path[i]].meta[0] === "-") {
            delete currDir.data[path[i]];
        }
    },
    
    mkdir: function(path) {
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
        if (!(path[i] in currDir.data)) {
            currDir.data[path[i]] = new FileObject("drw-rw-rw-", {});
        }
    },
    
    rmdir: function(path) {
        //resolve path
        if (path[0] !== "/") {
            //only absolute paths
            return;
        }
        path = path.split("/");
        var currDir = this.root;
        var i = 1;
        while (i < path.length - 1) {
            //if directory does not exist
            if (!(path[i] in currDir.data) ||
                    (currDir.data[path[i]].meta[0] !== "d")) {
                //path resolution failed
                return;
            }
            currDir = currDir.data[path[i]];
            i++;
        }
        if (path[i] in currDir.data && currDir.data[path[i]].meta[0] === "d") {
            var dir = currDir.data[path[i]].data;
            for(var file in dir) {
                if(dir.hasOwnProperty(file))
                    //directory not empty
                    return;
            }
            delete currDir.data[path[i]];
        }
    },
    
    //returns FileObject at specified path (absolute)
    getFile: function(path) {
        //resolve
        if (path[0] !== "/") {
            //only absolute paths
            return undefined;
        }
        if (path === "/") {
            return this.root;
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
