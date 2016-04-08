function FileObject(meta, data) {
    this.meta = meta;
    this.data = data;
}

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
        if(filepointer.filename.substr(0,4) === "dev/") {
            var char = fs.data[filepointer.filename][filepointer.index];
            fs.data[filepointer.filename] =
                    fs.data[filepointer.filename].substr(1);
            filepointer.index = -1;
            return char;
        }
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
