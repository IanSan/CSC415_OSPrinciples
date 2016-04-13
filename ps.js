/*
 * ps.js
 * List process being served in the Process Queue
 */
	fs.put("/ps",[
		[open, ["stdout", "w", "fp"]],
		[set, ["buffer", ""]],
		[function(pcb,argv){
			var d = [];
			var i, str;
			d = pq.iterate();
			str = "Processes currently running:\n";
			for(i=0; i<d.length; i++){
				str = str + d[i].toString() + "\n";
			}
			if (str.length > 0) {
                pcb.set("buffer", str);
            }			
		}, []],
		[write, ["fp", "buffer"]],
		[close, ["fp"]]
	]);
