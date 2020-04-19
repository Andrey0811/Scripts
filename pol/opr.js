charset="UTF-8";

var val = new Array();
var Args = WScript.Arguments;
var FSO = new ActiveXObject("Scripting.FileSystemObject");
var f = FSO.OpenTextFile("in.txt", 1);
var str = f.ReadLine();
while (!f.AtEndOfStream){
  var strTemp = (f.ReadLine()).split(' ');
  val[strTemp[0]] = parseInt(strTemp[1]);
}
f.Close();

var res = new String();
var st = new Array();
var priority = new Array();
priority['+'] = 3;
priority['-'] = 3;
priority['*'] = 4;
priority['/'] = 4;
priority['('] = 1;
priority[')'] = 2;
priority['^'] = 5;
var f = -1;
for (var i = 0; i < str.length; i++){
  //WSH.echo(f);
  if (priority[str.charAt(i)]){
    if (f == -1) Error();
    //if (str.charAt(i) == ')' || str.charAt(i) == '(') f = 0;
    //if (f == 1) Error();
    //if (str.charAt(i) != ')' || str.charAt(i) != '(') f = 1;
    if (str.charAt(i) == ')'){
      if (st.length == 0) Error();
      x = st.pop();
      while (x != '('){
        if (st.length == 0) Error();
        res += x;
        x = st.pop();
      }
    }
    else
    if (str.charAt(i) == '('
    || st.length == 0
    || priority[st[st.length - 1]] < priority[str.charAt(i)] ){
      st.push(str.charAt(i));
    }
    else{
      while (priority[st[st.length - 1]] >= priority[str.charAt(i)]){//следить за длиной стека
        x = st.pop();
        res += x;
      }
      st.push(str.charAt(i));
    }
  }
  else{
    f = 0;
    res += str.charAt(i);
  }
}
while (st.length != 0){
  x = st.pop();
  if (x == '(') Error();
  res += x;
}
WSH.echo(res);
for (var i = 0; i < res.length; i++){//класть сразу число
  if (priority[res.charAt(i)]){
    var o = st.pop();
    var t = st.pop();
    if (isNaN(o) && isNaN(t)){
      var y = val[o];
      var x = val[t];
    }
    else
      if (isNaN(o) && !isNaN(t)){
        var y = val[o];
        var x = t;
      }
      else
        if (!isNaN(o) && isNaN(t)){
          var y = o;
          var x = val[t];
        }
        else {
          var y = o;
          var x = t;
        }
    if (res.charAt(i) == '+'){
      st.push(x + y);
    }
    if (res.charAt(i) == '-'){
      st.push(x - y);
    }
    if (res.charAt(i) == '*'){
      st.push(x * y);
    }
    if (res.charAt(i) == '/'){
      if (y != 0)
        st.push(x / y);
      else Error();
    }
    if (res.charAt(i) == '^'){
      for (var i = 0; i < y; i++)
        x *= x;
      st.push(x);
    }
  }
  else{
    st.push(res.charAt(i));
  }
}
WSH.echo(st.pop());

function Error(){
  WSH.echo("Error");
  WScript.Quit();
}
