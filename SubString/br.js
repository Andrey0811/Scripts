charset = "UTF-8";

var Args = WScript.Arguments;
var FSO = new ActiveXObject("Scripting.FileSystemObject");

var f = FSO.OpenTextFile("a.txt", 1);
var countIn = 0;
var arrIn = new Array();
var str = f.ReadAll();
var prx = Args(0);
var value = new String();
if (Args.length > 1){
  value = Args(1);
  prx += " " + value;
}
var j = 0;
var i = 0;
var strLen = str.length;
var prxLen = prx.length;
var countKol = 0;
var arrHash = [];
var prxHash = 0;
var valHash = 0;

/*for (var i = 0; i <256; i++){
  WSH.echo(i + ": "+ String.fromCharCode(i));
}*/

ForExample();
//Benching();

function ForExample(){
  /*WSH.echo("BruteForce");
  Br();
  Out();
  WSH.echo("HashOne");
  HashOne();
  Out();
  WSH.echo("HashTwo");
  HashTwo();
  Out();
  WSH.echo("HashKarp");
  HashKarp();
  Out();*/
  WSH.echo("Boyer-Moore");
  BM();
  Out();
  /*WSH.echo("Automat");
  Am();
  Out();*/
}

function Benching(){
var countStart = 3;
var countLoop = 2;
var timeBr = 0;
var timeHashOne = 0;
var timeHashTwo = 0;
var timeHashKarp = 0;
var timeBM = 0;
var timeAm = 0;
for (var p = 0; p < countLoop; p++){
  WSH.echo("p: " + p);
  timeBr += (Bench(Br) / countStart);
  WSH.echo("Br");
  timeHashOne += (Bench(HashOne) / countStart);
  WSH.echo("HashOne");
  timeHashTwo += (Bench(HashTwo) / countStart);
  WSH.echo("HashTwo");
  timeHashKarp += (Bench(HashKarp) / countStart);
  WSH.echo("HashKarp");
  timeBM += (Bench(BM) / countStart);
  WSH.echo("BM");
  timeAm += (Bench(Am) / countStart);
  WSH.echo("AM");

}

WSH.echo("Time Broot Force (s): " + (timeBr / countLoop));
WSH.echo("Time Hash Function (s): " + (timeHashOne / countLoop));
WSH.echo("Time Quadratic Hash Function (s): " + (timeHashTwo / countLoop));
WSH.echo("Time Hash Rabbina-Karpa Function (s): " + timeHashKarp / countLoop);
WSH.echo("Time Boyer_Moore Function (s): " + (timeBM / countLoop));
WSH.echo("Time Automat Function (s): " + (timeAm / countLoop));

function Bench(func){
  var s = new Date();
  var start = s.getTime() + s.getMilliseconds();
  for (var t = 0; t < countStart; t++){
    func();
  }
  var e = new Date();
  var end = e.getTime() + e.getMilliseconds();
  return (parseInt(end) - start) / 1000;
}
}

function Out(){
  WSH.echo("Count collusion: " + countKol);
  WSH.echo("Count in: " + countIn);
  for (i = 0; i < countIn && i < 10; i++){
    WSH.echo((i + 1) + ": " + arrIn[i]);
  }
  WSH.echo();
}

function Br(){
  countKol = 0;
  countIn = 0;
  arrIn = [];
  i = 0;
  j = 0;
  while (i < strLen - prxLen + 1){
    while (j < prxLen){
      if (str.charAt(i + j) != prx.charAt(j)){
        j = 0;
        i++;
        break;
      }
      else
        if (j == prxLen - 1){
          arrIn[countIn] = i;
          countIn++;
          j = 0;
          i++;
          break;
        }
      j++;
    }
  }
}

function HashOne(){
  countKol = 0;
  countIn = 0;
  arrIn = [];
  i = 0;
  j = 0;
  arrHash = [];
  prxHash = 0;
  for (var i = 0; i < prxLen; i++){
    prxHash += prx.charCodeAt(i);
  }
  arrHash[0] = 0;
  arrHash[1] = str.charCodeAt(0);
  for (i = 2; i < strLen + 1; i++){
    arrHash[i] = arrHash[i - 1] + str.charCodeAt(i - 1);
  }
  var count2 = 0;
  var count1 = 0;
  var fl = 0;
  i = 1;
  while (i < strLen - prxLen + 2){
    if ((arrHash[i + prxLen - 1] - arrHash[i - 1]) == prxHash){
      count2++;
      //WSH.echo(i);
      fl = 1;
      j = i - 1;
      k = 0;
      while (j < i + prxLen - 1){
        count1++;
        if (str.charAt(j) != prx.charAt(k)){
          countKol++;
          fl = 0;
          break;
        }
        j++;
        k++;
      }
      if (fl == 1){
        arrIn[countIn] = i - 1;
        countIn++;
      }
    }
    i++;
  }
}

function HashTwo(){
  countKol = 0;
  countIn = 0;
  arrIn = [];
  i = 0;
  j = 0;
  arrHash = [];
  prxHash = 0;
  for (var i = 0; i < prxLen; i++){
    prxHash += (prx.charCodeAt(i) * prx.charCodeAt(i));
  }
  arrHash[0] = 0;
  arrHash[1] = str.charCodeAt(0) * str.charCodeAt(0);
  for (i = 2; i < strLen + 1; i++){
    arrHash[i] = arrHash[i - 1] + str.charCodeAt(i - 1) * str.charCodeAt(i - 1);
  }
  i = 1;
  while (i < strLen - prxLen + 2){
    if ((arrHash[i + prxLen - 1] - arrHash[i - 1]) == prxHash){
      var fl = 1;
      j = i - 1;
      k = 0;
      while (j < i + prxLen - 1){
        if (str.charAt(j) != prx.charAt(k)){
          countKol++;
          fl = 0;
          break;
        }
        j++;
        k++;
      }
      if (fl == 1){
        arrIn[countIn] = i - 1;
        countIn++;
      }
    }
    i++;
  }
}

function HashKarp(){
  countKol = 0;
  countIn = 0;
  arrIn = [];
  i = 0;
  j = 0;
  prxHash = 0;
  var strHash = 0;
  var con = 1;
  for (var i = prxLen - 1; i >= 0 ; i--){
    prxHash = (prxHash + prx.charCodeAt(i)) * 2;
    strHash = (strHash + str.charCodeAt(i)) * 2;
    con *= 2;
  }
  i = 0;
  while (i < strLen - prxLen + 2){
    if (strHash == prxHash){
      var fl = 1;
      j = i;
      k = 0;
      while (j < i + prxLen){
        if (str.charAt(j) != prx.charAt(k)){
          countKol++;
          fl = 0;
          break;
        }
        j++;
        k++;
      }
      if (fl == 1){
        arrIn[countIn] = i;
        countIn++;
      }
    }
    strHash = (strHash / 2 - str.charCodeAt(i) + str.charCodeAt(i + prxLen) * con);
    i++;
  }
}

function BM(){
  countKol = 0;
  countIn = 0;
  arrIn = [];
  var stopSyms = new Array();
  j = 0;
  i = 0;
  for (var i = 0; i < prxLen - 1; i++){
    stopSyms[prx.charAt(i)] = prxLen - i - 1;
  }
  stopSyms[prx.charAt(prxLen - 1)] = prxLen;
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
}

function Am(){
  countKol = 0;
  countIn = 0;
  arrIn = [];
  j = 0;
  i = 0;

  function Contains(arr, sym){
    for (var i in arr){
      if (i == sym){
        return true;;
      }
    }
    return false;
  }

  var alph = new Array();
  for(i = 0; i < prxLen; i++)
    alph[prx.charAt(i)] = 0;
  del = new Array(prxLen + 1);
  for(j = 0; j <= prxLen; j++)
    del[j]= new Array();
  for(i in alph)
    del[0][i] = 0;
  for(j = 0; j < prxLen; j++){
    prev = del[j][prx.charAt(j)];
    del[j][prx.charAt(j)] = j + 1;
    for(i in alph)
      del[j + 1][i] = del[prev][i];
  }
  /*for(j = 0; j <= prxLen; j++){
    out = j.toString() + ' ';
    for(i in alph)
    out += del[j][i] + ' ';
    WSH.echo(out);
  }*/
  j = 0;
  var check = 0;
  for (var i = 0; i < str.length; i++){
    if (del[check][str.charAt(i)] != undefined){
      check = del[check][str.charAt(i)];
      if (check == prxLen){
        arrIn[countIn] = i - prxLen + 1;
        countIn++;
      }
    }
    else{
      check = 0;
    }
  }
}
