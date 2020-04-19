charset="utf-8"

var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("input.txt", 1);
var str = f.ReadLine();
f.close();

//Escape
WScript.echo('Escape');
function SubStringLength(str, idx, sizeByte){
	var j = idx;
	while (str.charAt(j) == str.charAt(j + 1) && j + 1 - idx < sizeByte){
		j++;
	}
	return j - idx;
}

var instr = "";
var i = 0;
while (i < str.length){
	var len = SubStringLength(str, i, 256);
	if (len > 3 || str.charAt(i) == '#'){
		var k = i;
		i = k + len + 1;
		instr += "#" + str.charAt(k) + String.fromCharCode(len);
	}
	else{
		instr = instr + str.charAt(i);
		i++;
	}
}
WScript.echo('Encoding string: ' + instr);

var outstr = "";
i = 0;
while (i < instr.length){
	if (instr.charAt(i) == '#'){
		for (var j = 0; j < instr.charCodeAt(i + 2) + 1; j++){
			outstr = outstr + instr.charAt(i + 1);
		}
		i += 3;
	}
	if (instr.charAt(i) != '#') {
		outstr = outstr + instr.charAt(i);
		i++;
	}
}
WScript.echo('Decoding string: ' + outstr);

if (str == outstr)
	fl = true;
else
	fl = false;
WScript.echo('Compare: ' + fl);
WScript.echo('');

var instrOne = instr;
var outstrOne = outstr;
var flOne = fl;

//Jump
WScript.echo('Jump');
var instr = "";
var strTemp = "";
var repeatSymb = 0;
var notRepeatSymb = 0;
i = 0;
while (str.charCodeAt(i)){
	if (str.charCodeAt(i) == str.charCodeAt(i + 1) && repeatSymb < 127){
		repeatSymb++;
		if (notRepeatSymb != 0){
			instr += String.fromCharCode(notRepeatSymb + 128) + strTemp;
			strTemp = "";
			notRepeatSymb = 0;
		}
	}
	else {
		if (repeatSymb != 0){
			instr += String.fromCharCode(repeatSymb + 1) + str.charAt(i);
			repeatSymb = 0;
		}
		else {
		notRepeatSymb++;
		strTemp += str.charAt(i);
		}
	}
	i++;
}
if (notRepeatSymb != 0){
	instr += String.fromCharCode(notRepeatSymb + 128) + strTemp;
}
WScript.echo('Encoding string: ' + instr);

var outstr = "";
i = 0;
var NumberOfRepeat = 0;
while (instr.charCodeAt(i)){
	if (instr.charCodeAt(i) > 128){
		NumberOfRepeat = instr.charCodeAt(i) - 128;
		for (var j = 0; j < NumberOfRepeat; j++){
			outstr += instr.charAt(i + 1);
			i++;
		}
        }
	else {
		NumberOfRepeat = instr.charCodeAt(i);
		for (var j = 0; j < NumberOfRepeat; j++){
			outstr += instr.charAt(i + 1);
		}
		i++;
	}
i++;
}
WScript.echo('Decoding string: ' + outstr);

if (str == outstr)
	fl = true;
else
	fl = false;
WScript.echo('Compare: ' + fl);

/*var f = FSO.CreateTextFile("output.txt", true);
f.WriteLine('Escape-coding');
f.WriteLine('Encoding string: ' + instrOne);
f.WriteLine('Decoding string: ' + outstrOne);
f.WriteLine('Compare: ' + flOne);
f.WriteLine('');
f.WriteLine('Jump-coding');
//f.WriteLine('Encoding string: ' + instr);
f.WriteLine('Decoding string: ' + outstr);
f.WriteLine('Compare: ' + fl);
f.Close();*/
