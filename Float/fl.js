charset = "UTF-8";

var Args = WScript.Arguments;
var FSO = new ActiveXObject("Scripting.FileSystemObject");
var f = FSO.OpenTextFile("in.txt", 1);
var valOne = f.ReadLine();
var valTwo = f.ReadLine();
//var valOne = WSH.StdIn.ReadLine();
//var valTwo = WSH.StdIn.ReadLine();
f.Close();
//WSH.echo(valTwo.toString(2));
//проверка на не число
valOne = InnerFloatNumber(valOne);
valTwo = InnerFloatNumber(valTwo);
//WSH.echo(TwoTo10("100"));

WSH.echo(PrintFl(valOne));
WSH.echo(PrintFl(valTwo));
WSH.echo("--Dec Value--")
WSH.echo(Dec(valOne));
WSH.echo(Dec(valTwo));

var sum = Sum(valOne, valTwo);
WSH.echo("--Sum--")
WSH.echo(PrintFl(sum))
WSH.echo(Dec(sum))

function PrintFl(val){
  var arr = val.split(' ');
  var sign = arr[0];
  var p = arr[1];
  var mant = arr[2];
  var len = mant.length;
  if (len < 23){
    for (var i = 0; i < 23 - len; i++)
      mant += "0";
  }
  return sign + " " + p + " " + mant;
}

function To10(str, base, count)
{
  str = Reverse(str);
  var arr = str.split('');
  //WSH.echo(arr)
  var result = 0;
  var k = 0;
  for (var e in arr){
    if (k >= count && count != -1) return "infinity";
    k++;
    result += arr[e] * Math.pow(base, e)
  }
  return result;
}

function Reverse(str){
  var reverseStr = new String();
  for (var i = str.length - 1; i >= 0; i--){
    reverseStr += str.charAt(i);
  }
  return reverseStr;
}

function InnerFloatNumber(val){
  var arr = val.split('.', 2);
  var int = arr[0];
  //WSH.echo(int)
  var frac = arr[1];
  var sign = '0';
  if (int.charAt(0) == '-') {
    sign = '1';
    int = int.slice(1);
  }

  if (int == "0" && frac == "0") {
    return sign + " " + "00000000" + " " + "00000000000000000000000"
  }
  var reg = /[^0123456789]+/;
  if (reg.test(int) || reg.test(frac)){
    return sign + " " + "11111111" + " " + "01000000000000000000000";
  }

  int = (To10(int, 10, 61)).toString(2);
  if (int == "infinity") return sign + " " + "11111111" + " " + "00000000000000000000000";
  //WSH.echo(int)
  //WSH.echo(int.length)
  frac = fracTo2(frac,127 + 23 - int.length + 1);
  //WSH.echo(frac);
  var mant = int.slice(1) + frac;
  //WSH.echo(int)
  //WSH.echo(mant)
  var p = 127;
  if (int != "0"){
    p += int.length - 1;
  }
  else{
    var countZero = 0;
    for (var i = 0; i < mant.length; i++){
      if (mant.charAt(i) == '1') break;
      countZero++;

    for (var i = 0; i < countZero + 1 && i < 127; i++){
      //WSH.echo(mant)
      mant = mant.slice(1);
      p--;
    }
  }
}

  p = p.toString(2);
  if (p.length <= 8 && p.length > 0){
    var temp = p;
    p = "";
    for (var i = 0; i < 8 - temp.length; i++){
      p += "0";
    }
    p += temp;
  }
  return sign + " " + p.slice(0, 8) + " " + mant.slice(0, 23);

  function fracTo2(frac, count){
    //WSH.echo(frac)
    var result = new String();
    var i = 0;
    countZero = 0;
    while (frac.charAt(i) == "0"){
      countZero++;
      i++;
    }
    //WSH.echo(countZero)
    i = 0;
    var intFrac = To10(frac, 10, 128);
    while(intFrac != 0 && i < count){
      //WSH.echo(i);
      i++;
      var resFrac = intFrac * 2;
      //WSH.echo(i + " " + intFrac + " " + resFrac)
      if (LenRazr(intFrac, resFrac, countZero)){
        result += "1";
        resFrac = DelIRazr(resFrac);
        //WSH.echo("tut " + i + " " + intFrac)
      }
      else result += "0";
      intFrac = resFrac;
    }
    //WSH.echo(result)
    return result;
  }

  function DelIRazr(num){
    var str = num.toString();
    //WSH.echo(str)
    var x = To10(str.slice(1), 10, -1);
    //WSH.echo(x)
    return x;
  }

  function LenRazr(num, numRes, countZero){
    return ((num.toString()).length - (numRes.toString()).length) != 0 && (numRes.toString().length) > countZero + 1
  }
}

function Dec(val){
  //WSH.echo(val)
  var arr = val.split(" "); //либо мы пойдем по строке циклом
  var sign = arr[0];
  //WSH.echo(arr[0] + " " + arr[1] + " " + arr[2])
  var p = To10(arr[1], 2, -1);
//  WSH.echo(p)
  var mant = arr[2];
  var int = 0;
  var frac = 0;

  if (sign == 0) sign = "";
  else sign = "-"

  if (p == 255){
    var fl = false;
    for (var i = 0; i < mant.length; i++)
      if (mant.charAt(i) == "1"){
        fl = true;
        break;
      }
    if (fl) return "NaN"
    else return sign + "infinity"
  }

  if (p != 0){
    p -= 127;
    //WSH.echo(p)
    mant = "1" + mant;
    if (mant.slice(0, p + 1) == "" || p < 0) int = 0;
    else {
      int = To10(mant.slice(0, p + 1), 2, -1); //WSH.echo(int);
    }
    //WSH.echo(int + " " + mant.slice(0, p + 1))
    if (p + 1 < 0){
      var tempStr = new String();
      for (var i = 0; i < Math.abs(p + 1); i++){
        tempStr += "0";
      }
      mant = tempStr + mant;
      frac = frac2To10(mant.slice(0))
    }
    else frac = frac2To10(mant.slice(p + 1));
    //WSH.echo(frac)
    //WSH.echo(mant.slice(p + 1))
  }
  else{
    mant = "0" + mant;
    //WSH.echo(mant)
    int = 0;
    frac = frac2To10(mant)//parseInt(mant, 2);
  }

  return sign + (int + frac).toString();

  function frac2To10(frac){
    //WSH.echo("--frac--")
    //WSH.echo(frac)
    var num = 0;
    for (var i = 1; i <= frac.length; i++){
      num += Math.pow(2, -i) * To10(frac.charAt(i - 1), 10, -1);
    }
    //WSH.echo("num = " + num)
    //WSH.echo("--end--")
    return num;
  }
}

function Sum(val1, val2){
  var arr1 = val1.split(" ");
  var sign1 = arr1[0];
  var p1 = To10(arr1[1], 2, -1);
  //WSH.echo("p1 = " + p1);
  var mant1 = new String();

  var arr2 = val2.split(" ");
  var sign2 = arr2[0];
  var p2 = To10(arr2[1], 2, -1);
  //WSH.echo("p1 = " + p1);
  var mant2 = new String();

  var resultSign = "0";
  var resultMant = new String();
  var resultP = Math.max(p1, p2);

  if (p1 != 0) mant1 = "1" + arr1[2];
  else mant1 = "0" + arr1[2];
  if (p2 != 0) mant2 = "1" + arr2[2];
  else mant2 = "0" + arr2[2];

  var fl1 = false;
  var fl2 = false;
  //WSH.echo(mant1)
  //WSH.echo(mant2)
  if (p1 == 255 || p2 == 255){
    for (var i = 1; i < mant1.length; i++)
      if (mant1.charAt(i) == "1"){
        fl1 = true;
        break;
      }
    for (var i = 1; i < mant2.length; i++)
      if (mant2.charAt(i) == "1"){
        fl2 = true;
        break;
      }
      /*
      WSH.echo("fl1 = " + fl1)
      WSH.echo("p1 = " + p1)
      WSH.echo("fl2 = " + fl2)
      WSH.echo("p2 = " + p2)
      */
    if ((fl1 && p1 == 255) || (p2 == 255 && fl2) || (p1 == 255 && p2 == 255 && sign1 != sign2)) return sign1  + " "  + "11111111" + " " + "10000000000000000000000";
    else
    if (p1 == 255) return sign1 + " "  + "11111111" + " " + "00000000000000000000000";
    else
    if (p2 == 255) return sign2 + " "  + "11111111" + " "  + "00000000000000000000000";
  }
  //WSH.echo("in: " + mant1 + " " + mant2)

  if (mant1.length != mant2.length){
    if (mant1.length > mant2.length){
      for (var i = 0; i <= mant1.length - mant2.length; i++) mant2 += "0";
    }
    else{
      for (var i = 0; i <= mant2.length - mant1.length; i++) mant1 += "0";
    }
  }
  //WSH.echo("1 = " + mant1);
  //WSH.echo("2 = " + mant2);
  if (p1 != p2 && resultP == p1){
    var shift = p1 - p2;
    //WSH.echo(shift);
    p2 += shift;
    var temp = new String();
    for (var i = 0; i < shift; i++){
      temp += "0";
    }
    mant2 = temp + mant2.slice(0, 23)
  }

  if (p1 != p2 && resultP == p2){
    var shift = p2 - p1;
    p1 += shift;
    var temp = new String();
    for (var i = 0; i < shift; i++){
      temp += "0";
    }
    mant1 = temp + mant1.slice(0, 23)
  }
  resultSign = sign1;

  if ((sign1 == "1" || sign2 == "1") && sign1 != sign2){
    if (!Mant1IsBigger(mant1, mant2)){
      var temp = mant2;
      mant2 = mant1;
      mant1 = temp;
      resultSign = sign2;
      //WSH.echo("1 = " + mant1)
    }
    var ost = "";
    for (var i = mant1.length - 1; i >= 0 ; i--){
      if (mant2.charAt(i) == "0"){
        if (ost == "") resultMant += mant1.charAt(i);
        else if (mant1.charAt(i) == "0") resultMant += ost;
        else {
          resultMant += "0";
          ost = "";
        }
      }
      else{
        if (mant1.charAt(i) == "1"){
          if (ost == "") resultMant += "0";
          else {
            resultMant += "1";
          }
        }
        else{
          if (ost == ""){
            ost = "1";
            resultMant += "1";
          }
          else resultMant += "0";
        }
      }
    }
    resultMant = Reverse(resultMant);
    var posit = 0;
    var countZero = 0;
    for (var i = 0; i < resultMant.length && resultP - countZero > 0; i++){
      if (resultMant.charAt(i) == "1") {
        posit = i;
        break;
      }
      countZero++;
    }
    return resultSign + " " + (resultP - countZero).toString(2) + " " + resultMant.slice(posit + 1, posit + 23);
  }

  //WSH.echo("out: " + mant1 + " " + mant2)
  var ost = "";
  for (var i = mant1.length - 1; i >= 0; i--){
    //WSH.echo(resultMant)
    //WSH.echo(ost)
    //WSH.echo(i + ": " + mant1.charAt(i)  + " " + mant2.charAt(i))
    if ((mant1.charAt(i) == "1" && mant2.charAt(i) == "0")
  || (mant1.charAt(i) == "0" && mant2.charAt(i) == "1")){
    if (ost == "") resultMant += "1";
    else
    if (ost == "1") {
      resultMant += "0";
      //ost = "";
      //WSH.echo(i + " " + ost)
    }
    }
    else
    if (mant1.charAt(i) == "0" && mant2.charAt(i) == "0"){
      if (ost == "1"){
        resultMant += "1";
        ost = "";
      }
      else
      if (ost == "") resultMant += "0";
    }
    else
    if (mant1.charAt(i) == "1" && mant2.charAt(i) == "1"){
      if (ost == "") {
        resultMant += "0";
        ost = "1";
      }
      else
      if (ost == "1") resultMant += "1"
    }
    //WSH.echo(ost)
  }
  resultMant = Reverse(resultMant);
  //WSH.echo(ost)
  if (ost == "1") resultP += 1;
  if (ost == "") resultMant = resultMant.slice(1);
  //WSH.echo("final: " + resultMant + " " + resultP);
  return resultSign + " " + resultP.toString(2) + " " + resultMant.slice(0, 23);

  function Reverse(str){
    var reverseStr = new String();
    for (var i = str.length - 1; i >= 0; i--){
      reverseStr += str.charAt(i);
    }
    return reverseStr;
  }

  function Mant1IsBigger(mant1, mant2){
    for (var i = 0; i < mant1.length; i++){
      if (mant1.charAt(i) == "1" && mant2.charAt(i) == "0") return true;
      if (mant2.charAt(i) == "1" && mant1.charAt(i) == "0") return false;
    }
    return false;
  }
}
