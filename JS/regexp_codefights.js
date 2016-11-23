// format     //DB 5//
// Use regexp with quote need escape by \\

// TEST 1
// Input :

// source: ["ans = 0", 
//  "for i in range(n):", 
//  "    for j in range(n):", 
//  "    //DB 3//for j in range(1, n):", 
//  "    //DB 2//for j in range(n + 1):", 
//  "        ans += 1", 
//  "return ans"]

// challengeId: 3

// Output:
// ["ans = 0", 
//  "for i in range(n):", 
//  "for j in range(1, n):", 
//  "        ans += 1", 
//  "return ans"]

// Expected Output:
// ["ans = 0", 
//  "for i in range(n):", 
//  "    for j in range(1, n):", 
//  "        ans += 1", 
//  "return ans"]


// TEST 2
// source: ["ans = 0;", 
//  "for (var i = 0; i < n; i++) {", 
//  "    for (var j = 0; j < n; j++) {", 
//  "    //DB 3//for (var j = 1; j < n; j++) {", 
//  "    //DB 2//for (var j = 0; j < n + 1; j++) {", 
//  "        ans++;", 
//  "    }", 
//  "}", 
//  "return ans;"]
// challengeId: 2
// Output:
// ["ans = 0;", 
//  "for (var i = 0; i < n; i++) {", 
//  "    for (var j = 0; j < n + 1; j++) {", 
//  "        ans++;", 
//  "    }", 
//  "}", 
//  "return ans;"]
// Expected Output:
// ["ans = 0;", 
//  "for (var i = 0; i < n; i++) {", 
//  "    for (var j = 0; j < n + 1; j++) {", 
//  "        ans++;", 
//  "    }", 
//  "}", 
//  "return ans;"]

function taskMaker(source, challengeId) {
    var result = [];
    var commonCommentRe = new RegExp('\\/\\/DB\\s\\d+\\/\\/', 'i');
    var specificChalengeCommentRe = new RegExp('\\/\\/DB\\s'+challengeId+'\\/\\/', 'i');
    for (var i=0; i<source.length; i++){
        var codeLine = source[i];
        if (!commonCommentRe.test(codeLine)){
            result.push(codeLine);
        }
        if (specificChalengeCommentRe.test(codeLine)){
            result[result.length-1] = codeLine.replace(specificChalengeCommentRe,'');
        }
    }
    return result;
}

var  source = ["ans = 0", 
 "for i in range(n):", 
 "    for j in range(n):", 
 "    //DB 3//for j in range(1, n):", 
 "    //DB 2//for j in range(n + 1):", 
 "        ans += 1", 
 "return ans"];
var chanlengeID = 3;
console.log(taskMaker(source, chanlengeID));