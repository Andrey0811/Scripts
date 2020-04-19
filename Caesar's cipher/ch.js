charset = "UTF-8";
var Args = WScript.Arguments;
var FSO = new ActiveXObject("Scripting.FileSystemObject");
var f = FSO.OpenTextFile("in.txt", 1);
var textIn = f.ReadAll();
//var checkText = /[^abcdefghijklmnopqrstuvwxyz \.,!\?:;"-]+\i/;
//if (checkText.test(textIn)) Error("Input Text")
f.Close();

f = FSO.OpenTextFile("1.txt", 1);
var textLearn = f.ReadAll();
f.Close();

//var checkShift = /[^0123456789]+/;
var shift = parseInt(Args(0));
//if (checkShift.test(shift)) Error("Input Shift");

//var alph = new Array( 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', '.', ',', '!', '?', '"', ':', ' ', ';', '-' );
var alph = ['a', 'b', 'c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '.', ',', '!', '?', ':', ';', '"', '-'];
var alphNum = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 'i': 8, 'j': 9, 'k': 10, 'l': 11, 'm': 12, 'n': 13, 'o': 14, 'p': 15, 'q': 16, 'r': 17, 's': 18, 't': 19, 'u': 20, 'v': 21, 'w': 22, 'x': 23, 'y': 24, 'z': 25, ' ': 26, '.': 27, ',': 28, '!': 29, '?': 30, ':': 31, ';': 32, '"': 33, '-': 34 };
var powerAlph = alph.length;
var encodText = Coding(textIn, shift);
var findShift = SearchShift(encodText, textLearn);
PrintFindShift(findShift);
WSH.echo(Coding(encodText, findShift));

function PrintFindShift(findShift){
  WSH.echo("Shift decoding = " + (powerAlph - findShift));
}

function Contains(arr, x){
  for (var e in arr){
    if (e == x) return e;
  }
  return -1;
}

function Error(idx){
  WSH.echo("Wrong input in " + idx);
  WScript.Quit();
}

function FrequencyOfSymbols(text){
  var arrFrequency = new Array();
  var lenText = text.length;
  for (var e in alphNum) {
    arrFrequency[e] = 0;
  }
  for (var i = 0; i < lenText; i++){
    var e = Contains(alphNum, text.charAt(i).toLowerCase());
    if (e != -1){
      arrFrequency[e]++;
    }
  }
  for (var e in alphNum){
    arrFrequency[e] = (arrFrequency[e] / lenText);
  }
  return arrFrequency;
}

function Coding(text, shift){
  var inStr = new String();
  for (var i = 0; i < text.length; i++){
    if (text.charAt(i) == '\n' || (text.charAt(i) == '\r' &&        text.charAt(i + 1) == '\n')){ continue; }
    else  if (alphNum[text.charAt(i).toLowerCase()] == undefined) Error(i);
    else {
      inStr += alph[Math.abs(shift + alphNum[text.charAt(i).toLowerCase()]) % powerAlph];
    }
  }
  return inStr
}

function SearchShift(text, learn){
  var arrFreqLocal = FrequencyOfSymbols(text);
  for (var e in arrFreqLocal){
  }
  var arrFreq = FrequencyOfSymbols(learn);
  for (var e in arrFreq){
  }
  var lenText = text.length;
  var arrFrTemp = new Array();
  for (var i = 0; i < powerAlph; i++){
    var sum = 0;
    for (var j = 0; j < lenText; j++){
      if (text.charAt(j) == '\n' || (text.charAt(j) == '\r' &&        text.charAt(j + 1) == '\n')) continue;
      else  if (alphNum[text.charAt(j).toLowerCase()] == undefined) Error(j);
      else {
        sum += (arrFreq[alph[Math.abs(alphNum[text.charAt(j)] + i) % powerAlph]] - arrFreqLocal[text.charAt(j)]) * (arrFreq[alph[(alphNum[text.charAt(j)] + i) % powerAlph]] - arrFreqLocal[text.charAt(j)]);
      }
    }
    arrFrTemp[i] = sum;
  }
  return MinArr(arrFrTemp);
}

function MinArr(arr){
  var min = arr[0];
  var minIdx = 0;
  for (var i = 1; i < arr.length; i++){
    if (arr[i] <= min){
      min = arr[i];
      minIdx = i;
    }
  }
  return minIdx;
}
