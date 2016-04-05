/*
 * ps.js
 * List process being served in the Process Queue
 */
	var ps = function(){
		var d = [];
		var i;
		d = pq.iterate();
		str = "Processes are\n";
		for(i=0; i<d.length; i++){
			str = str + d[i].object.pid + "\n";
		}
      
	};
                    