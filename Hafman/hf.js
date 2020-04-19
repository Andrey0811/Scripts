charset = "UTF-8";
var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("in.txt", 1);
var str = f.ReadLine();
f.Close();

function node(name, fr, code, left, right, idx){
  this.name = name;
  this.fr = fr;
  this.code = code;
  this.left = left;
  this.right = right;
  this.idx = idx;
}

var arrTree = new Array();
var tree = new Array();
var alph = new Array();
for (var i = 0; i <str.length; i++){
  if (alph[str.charAt(i)] == undefined) alph[str.charAt(i)] = 1;
  else alph[str.charAt(i)]++;
}
var alphLen = 0;

// create tree
var queue = new Array();
for (var i in alph){
  var nodeTemp = new node(i, alph[i], new String(), -1, -1, 0);
  tree.push(nodeTemp);
  alphLen++;
}

// Sort
for (var i = 0; i < tree.length - 1; i++){
  for (var j = 0; j < tree.length - i - 1; j++){
    //WSH.echo(tree[j])
    if (tree[j + 1].fr < tree[j].fr){
      //WSH.echo(tree[j].name + ": " + tree[j].fr + " " + tree[i].name + ": " + tree[i].fr)
      var x = tree[j + 1];
      tree[j + 1] = tree[j];
      tree[j] = x;
    }
  }
}
var count = 0;

for (var e in tree){
  tree[e].idx = count;
  count++;
  queue.push(tree[e])
  //WSH.echo(tree[e].name + " " + tree[e].fr + " " + tree[e].code + " " + tree[e].left + " " + tree[e].right + " " + tree[e].idx)
}

for (var k = 0; k < alphLen - 1; k++){
  var nodeTemp1 = queue.shift();
  var nodeTemp2 = queue.shift();
  //WSH.echo(nodeTemp1 + " " + nodeTemp2)
  var nodeTemp3 = new node(nodeTemp1.name + nodeTemp2.name, nodeTemp1.fr + nodeTemp2.fr, new String(), nodeTemp1.idx, nodeTemp2.idx, count);
  count++;
  tree.push(nodeTemp3);
  var freqTemp = nodeTemp3.fr;
  var posit = 0;
  for (var e in queue){
    if (queue[e].fr < freqTemp) posit++;
    else break;
  }
  //WSH.echo(posit);
  if (posit == 0) queue.unshift(nodeTemp3);
  else if (posit == queue.length) queue.push(nodeTemp3);
  else{
    var part1 = queue.slice(0, posit);
    var part2 = queue.slice(posit);
    part1.push(nodeTemp3);
    queue = part1.concat(part2);
  }
}

GetCode(tree.length - 1);

PrintTree();
pr(tree)
var arrCode = new Array();
var j = 0;
for (var i in alph){
  arrCode[i] = tree[j].code;
  j++;
}
var instr = new String();
for (var k = 0; k < str.length; k++){
  instr += arrCode[str.charAt(k)];
}
WSH.echo("Encoding str: " + instr);

var outstr = new String();
var tempStr = new String();
  for (var i = 0; i <instr.length; i++){
    tempStr += instr.charAt(i);
    for (var j in arrCode){
      if (arrCode[j] == tempStr){
        outstr += j;
        tempStr = "";
        break;
      }
    }
  }
WSH.echo("Decoding str: " + outstr);

if (str == outstr) WSH.echo("Comparer: True")
  else WSH.echo("Comparer: False")

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Error(){
  WSH.echo("Error");
  WScript.Quit();
}

function pr(arr){
  for (var e in arr)
  WSH.echo(arr[e].fr)
}
/*
function Sort(l, r){
  if (l >= r) return false;
  var x = tempAlph[getRandomInt(l, r)];
  var l1 = l;
  var r1 = r;
  while (l1 <= r1){
    while (tempAlph[l1].fr < x) l1++;
    while (tempAlph[r1] > x) r1--;
    if (l1 <= r1){
      var temp = tempAlph[l1];
      tempAlph[l1] = tempAlph[r1];
      tempAlph[r1] = temp;
      r1--;
      l1++;
    }
  }
  Sort(l, r1);
  Sort(r1 + 1, r);
}
*/
function GetCode(startIdx){
  if (tree[startIdx].left != -1 && tree[startIdx].right != -1){
    tree[tree[startIdx].left].code = tree[startIdx].code + "1";
    GetCode(tree[startIdx].left);
    tree[tree[startIdx].right].code = tree[startIdx].code + "0";
    GetCode(tree[startIdx].right);
  }
}

function PrintTree(){
  WSH.echo("Tree")
  WSH.echo("Length = " + tree.length)
  for (var e in tree){
    WSH.echo(tree[e].name + " " /*+ tree[e].fr + " "*/ + tree[e].code + " " + tree[e].left + " " + tree[e].right + " " + tree[e].idx)
  }
  WSH.echo();
}
