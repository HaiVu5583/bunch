function isEqual(array1, array2){
    if (array1.length != array2.length){
        return false;
    }
    for (var i=0; i<array1.length; i++){
        if (array1[i] != array2[i]){
            return false;
        }
    }
    return true;
}

function plagiarismCheck(code1, code2){
    var nonCharacterRe = new RegExp("\\W+", "g");
    var characterRe = new RegExp("\\w+", "g");
    var replaceMap = {};
    if (code1.length != code2.length){
        return false;
    }
    for (var i=0; i<code1.length; i++){
        var line1 = code1[i];
        var line2 = code2[i];
        var nonCharacterArr1 = line1.split(characterRe);
        var nonCharacterArr2 = line2.split(characterRe);
        if (!isEqual(nonCharacterArr1, nonCharacterArr2)){
            return false;
        }
        var characterArr1 = line1.split(nonCharacterRe);
        var characterArr2 = line2.split(nonCharacterRe);
        if (characterArr1.length != characterArr2.length){
            return false;
        }
        for (var j=0; j<characterArr1.length; j++){
            if (characterArr1[j] != characterArr2[j]){
                if (!replaceMap[characterArr1[j]]){
                    replaceMap[characterArr1[j]] = characterArr2[j];
                }
            }
        }
    }

    var keyArr = Object.keys(replaceMap);
    for (var i=0; i<code1.length; i++){
        for (j=0; j<keyArr.length; j++){
            var replaceRe = new RegExp(keyArr[j], "g");
            code1[i] = code1[i].replace(replaceRe, replaceMap[keyArr[j]]);
            // console.log("i: "+i+ "  "+code1[i]);
        }
    }

    console.log(code1);
    if (isEqual(code1, code2)){
        return true;
    }

    return false;
}

// PASS
var code1 = ["def is_even_sum(a, b):",
         "    return (a + b) % 2 == 0"];

var code2 = ["def is_even_sum(summand_1, summand_2):",
         "    return (summand_1 + summand_2) % 2 == 0"];

// FAILED
// var   code1 =  ["def return_smth(a, b):", 
//  "  return a + a"];
// var code2 =  ["def return_smth(b, a):", 
//  "  return b + b"];

// FAILED

//  Input:
// code1: ["def f(a,b)", 
//  "    return a + b"]
// code2: ["def f(b,a)", 
//  "    return b + a"]
// Output:
// false
// Expected Output:
// true
// Console Output:
// Empty

console.log(plagiarismCheck(code1, code2));
