var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("input.txt", 1);
var str = f.ReadAll()
f.close();

var sum = 0.0;
var powerOfAlphabet = 0;
var countOfLetter = [];
var ind =[]

for (var i = 0; i < str.length; i++){
	countOfLetter[str.charAt(i)]=0;
}

for (var i = 0; i < str.length; i++){
	countOfLetter[str.charAt(i)]++;
}

for (var i in countOfLetter)
	if (countOfLetter[i] > 0){
		powerOfAlphabet++;
		ind[powerOfAlphabet - 1] = i;
	}
	
if (powerOfAlphabet == 1)
	sum = -0;
else
	for (var i =0; i < powerOfAlphabet;i++) {
		sum += (countOfLetter[ind[i]] / str.length) * 
			(Math.log(countOfLetter[ind[i]] / str.length) / Math.log(powerOfAlphabet));
	}
	
sum *= -1;
WScript.echo(sum);
