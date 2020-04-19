/*
language descriptions
input <memoryСellInt> - Ask the user to enter the <Number> (from the console), assign this <Number> to the <memoryСellInt>
output <memoryСellInt> - Output the memoryСellInt value
write <memoryСellInt> <Number> - Assign <Number> to the <memoryСellInt>
plus <memoryСellIntOneNumber> <memoryСellIntTwoNumber> <memoryСellIntResult> - Sum of two numbers
minus <memoryСellIntOneNumber> <memoryСellIntTwoNumber> <memoryСellIntResult> - Difference two numbers
multiply <memoryСellIntOneNumber> <memoryСellIntTwoNumber> <memoryСellIntResult> - Multiply two numbers
abs <memoryСellInt> <memoryСellIntResult> - Number modulus
equal <memoryСellIntOneNumber> <memoryСellIntTwoNumber> <memoryСellIntResult> - Equality of two numbers
less <memoryСellIntOneNumber> <memoryСellIntTwoNumber> <memoryСellIntResult> - The smaller of the two numbers
more <memoryСellIntOneNumber> <memoryСellIntTwoNumber> <memoryСellIntResult> - the biggest of the two numbers
goto <nameLabel> - Where to go back
link <nameLabel> - label designation
exit - The end of the program
*/

var Args = WScript.Arguments;

var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile(Args(0), 1);

var mem = [];
var ip = 0;
var link;

while (!f.AtEndOfStream) {
	var k = f.ReadLine();
	mem = mem.concat(k.split(' '));
}

f.close();

while (true) {

switch (mem[ip]) {

case 'input' :
mem[mem[ip + 1]] = WScript.StdIn.ReadLine();
//Number.isInteger(mem[mem[ip + 1]]
if (parseInt(mem[mem[ip + 1]]) != mem[mem[ip + 1]]) {
	WScript.Echo('Not a number');
	WScript.Quit();
	}
//else
	//mem[mem[ip + 1]] = mem[ip + 2];
ip += 1;
break

case 'output' :
WScript.Echo(mem[mem[ip + 1]]);
ip++;
break

case 'plus' :
mem[mem[ip + 3]] = parseInt(mem[mem[ip + 1]]) + parseInt(mem[mem[ip + 2]]);
ip += 3;
break

case 'minus' :
mem[mem[ip + 3]] = parseInt(mem[mem[ip + 1]]) - parseInt(mem[mem[ip + 2]]);
ip += 3;
break

case 'multiply' :
mem[mem[ip + 3]] = parseInt(mem[mem[ip + 1]]) * parseInt(mem[mem[ip + 2]]);
ip += 3;
break

case 'goto' :
link = mem[ip + 1];
ip = 0;
while ((mem[ip + 1] != "link") || (mem[ip + 2] != link)){
	ip++;
}
ip += 2;
break

case 'exit' :
WScript.Quit();
break

case 'write' :
mem[mem[ip + 1]] = mem[ip + 2];
ip += 2;
break

case 'equal' :
if (mem[mem[ip + 1]] == mem[mem[ip + 2]]) {
	link = mem[ip + 3];
	ip = 0;
	while ((mem[ip + 1] != "link") || (mem[ip + 2] != link)){
		ip++;
	}
	ip += 2;
}
else
	ip += 3;
break

case 'more' :
if (mem[mem[ip + 1]] > mem[mem[ip + 2]]) {
	link = mem[ip + 3];
	ip = 0;
	while ((mem[ip + 1] != "link") || (mem[ip + 2] != link))
		ip++;
	ip += 2;
}
else
	ip += 3;
break

case 'less' :
if (mem[mem[ip + 1]] < mem[mem[ip + 2]]) {
	link=mem[ip + 3];
	ip = 0;
	while ((mem[ip + 1] != "link") || (mem[ip + 2] != link))
		ip++;
	ip += 2;
}
else
	ip += 3;
break

case 'abs' :
mem[mem[ip + 2]] = Math.abs(mem[mem[ip + 1]]);
ip += 2;
break
}
if (ip - mem.length == 1)
	ip = 0;
else
	ip++;
}
for (var i in mem) WScript.echo(mem[i]);
