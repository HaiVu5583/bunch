// For

// code1 = ["def is_even_sum(a, b):",
//          "    return (a + b) % 2 == 0"]
// and

// code2 = ["def is_even_sum(summand_1, summand_2):",
//          "    return (summand_1 + summand_2) % 2 == 0"]
// the output should be plagiarismCheck(code1, code2) = true.

// All occurrences of a are replaced with summand_1, and all occurrences of b are replaced with summand_2.


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
    var replaceWord1 = [];
    var replaceWord2 = [];
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
                if (!replaceWord1.includes(characterArr1[j])){
                    replaceWord1.push(characterArr1[j]);
                }
                if (!replaceWord2.includes(characterArr2[j])){
                    replaceWord2.push(characterArr2[j]);
                }
                // if (!replaceMap[characterArr1[j]]){
                //     replaceMap[characterArr1[j]] = characterArr2[j];
                // }
            }
        }
    }
    console.log(replaceWord1);
    console.log(replaceWord2);
    // console.log(replaceMap);
    // var replaceRe = RegExp(Object.keys(replaceMap).join("|"),"gi");
    for (var i=0; i<code1.length; i++){
        for (j=0; j<replaceWord1.length; j++){
            code1[i] = code1[i].replace(replaceWord1[j], replaceWord2[j]);
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
var   code1 =  ["def return_smth(a, b):", 
 "  return a + a"];
var code2 =  ["def return_smth(b, a):", 
 "  return b + b"];

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
