charset = "UTF-8";

var Args = WScript.Arguments;
var FSO = new ActiveXObject("Scripting.FileSystemObject");

var f = FSO.OpenTextFile("in.txt", 1);

countIn = 0;
arrIn = [];
var stopSyms = new Array();
j = 0;
i = 0;
for (var i = 0; i < prxLen - 1; i++){
  stopSyms[prx.charAt(i)] = prxLen - i - 1;
}
stopSyms[prx.charAt(prxLen - 1)] = prxLen - 1;
i = 0;
while (i < strLen - prxLen + 1){
  for (var j = prxLen - 1;  j >= 0; j--){
    if (str.charAt(i + j) != prx.charAt(j)){
      if (stopSyms[str.charAt(i + j)]){
        i += stopSyms[str.charAt(i + j)];
        break;
      }
      else{
        i += prxLen - 1;
        break;
      }
    }
    if (j == 0){
      arrIn[countIn] = i;
      countIn++;
      i += stopSyms[str.charAt(i)];
    }
  }
}

WSH.echo("Count in: " + countIn);
for (i = 0; i < countIn && i < 11; i++){
  WSH.echo((i + 1) + ": " + arrIn[i]);
}
