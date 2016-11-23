function cardinal(n) {
	var parts = [];
	var baseCardinal = {
		0: "zero",
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5:"five",
		6:"six",
		7:"seven",
		8:"eight",
		9:"nine",
		10:"ten",
		11:"eleven",
		12:"twelve",
		13:"thirteen",
		14:"fourteen",
		15:"fifteen",
		16:"sixteen",
		17:"seventeen",
		18:"eighteen",
		19:"nineteen",
		20:"twenty",
		30:"thirty",
		40:"forty",
		50:"fifty",
		60:"sixty",
		70:"seventy",
		80:"eighty",
		90:"ninety",
		100:"hundred",
		1000:"thousand",
		1000000:"million",
		1000000000:"billion",
		1000000000000:"trillion"
	};
	if (baseCardinal.hasOwnProperty(n)) return baseCardinal[n];
	while (n>0){
		var lastKey;
		for (var key in baseCardinal){
			if (baseCardinal.hasOwnProperty(key)){
				if (n >=key){
					lastKey = key;
				}
			}
		}
		var divide = Math.floor(n/lastKey);
		if (n > 100){
			if (baseCardinal.hasOwnProperty(divide)){
				parts.push(baseCardinal[divide]+" "+baseCardinal[lastKey]);
			}else{
				parts.push(cardinal(divide)+" "+baseCardinal[lastKey]);
			}
			
		}else{
			parts.push(baseCardinal[lastKey]);
		}
		n = n - divide*lastKey;
	}
	var result="";
	for (var i=0; i<parts.length; i++){
		if (i <= parts.length-3){
			result += parts[i]+" ";
		}else if(i == parts.length-2){
			result += "and "+parts[i]+" ";
		}else{
			result += parts[i];
		}
	}
	return result;
}
console.log(cardinal(13331));

