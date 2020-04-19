countIn = 0;
arrIn = [];
j = 0;
i = 0;

function contains(arr, sym){
  for (var i in arr){
    if (i == sym){
      return 1;
    }
  }
  return 0;
}

var alph = new Array();
for(i = 0; i < prxLen; i++)
  alph[prx.charAt(i)] = 0;
del = new Array(prxLen + 1);
for(j = 0; j <= prxLen; j++)
  del[j]= new Array();
for(i in alph)
  del[0][i] = 0;
//Формируем таблицу переходов
for(j = 0; j < prxLen; j++){
  prev = del[j][prx.charAt(j)];
  del[j][prx.charAt(j)] = j + 1;
  for(i in alph)
    del[j + 1][i] = del[prev][i];
}
//Выводим таблицу переходов
/*for(j = 0; j <= prxLen; j++){
  out = j.toString() + ' ';
  for(i in alph)
  out += del[j][i] + ' ';
  WSH.echo(out);
}*/
j = 0;
for (i = 0; i < str.length; i++){
  if (contains(alph, str.charAt(i)) == 1){
    j = del[j][str.charAt(i)];
    if (j == prxLen){
      arrIn[countIn] = i - prxLen + 1;
      countIn++;
    }
  }
}
