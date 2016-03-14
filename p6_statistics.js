 // quiz 1-7
 // quiz 8-14
 // project 15-20
 // evaluate 21-26
 // individual 27-29
 // group 30-32
 // exam 33
fs.data["stats.csv"] = "\
20,20,20,20,20,20,20,\
20,20,20,20,20,20,20,\
20,20,20,20,20,20,\
20,20,20,20,20,20,\
20,20,20,\
20,20,20,\
280\
"
fs.data["stats_result.csv"] =""

function calcGrade(pcb,argv) {
	var arr = pcb.get("buffer").split(",");
	var wp = [40, 30, 30]; // grade weight percentage
	var quiz = 0;
	var code = 0;
	var evaluate = 0;
	var ind = 0;
	var group = 0;
	var exam = 0;
	var total = 0;
	for (var i = 0; i < arr.length; i++){	
		total = parseFloat(arr[i]) + total;
		if(i<14){
			quiz = parseFloat(arr[i]) + quiz;
		}
		else if(i<20){
			code = parseFloat(arr[i]) + code;
		}
		else if(i<26){
			evaluate = parseFloat(arr[i]) + evaluate;
		}
		else if(i<29){
			ind = parseFloat(arr[i]) + ind;
		}
		else if(i<32){
			group = parseFloat(arr[i]) + group;
		}
		else if(i<33){
			exam = parseFloat(arr[i]);
		}
	} ;
	var grade = (code + evaluate + ind + group) + quiz + exam
	var finalGrade = "F";
		if(grade>=(0.90*total))
			finalGrade = "A";
		else if (grade>=(0.80*total))
			finalGrade = "B";
		else if (grade>=(0.70*total))
			finalGrade = "C";
		else if (grade>=(0.60*total))
			finalGrade = "D";
			
	console.log("Your final grade is " + finalGrade);
};

var classGrade =
[
	[open, ["stats.csv", "r", "fp"]],
	[read, ["fp", "buffer", 10000]],
	[close, ["fp"]],
	[calcGrade, []],
	[open, ["stats_result.csv", "w", "fp2"]],
	[write, ["fp2","buffer"]],
	[close, ["fp2"]]
];
	