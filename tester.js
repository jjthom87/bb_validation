const wees = ['Teddy (jade, Old Face)','Teddy (brown, Old Face)','Teddy (magenta, Old Face)'];
let wah = 'old face jade teddy';

wees.forEach((w) => {
  let modifiedW = w;
  if(w.includes("(")){
    let indexOf = modifiedW.indexOf("(");
    modifiedW = modifiedW.replace("(", '');
    indexOf = modifiedW.indexOf(")");
    modifiedW = modifiedW.replace(")", '');
  }
  if(modifiedW.includes(",")){
    let indexOf = modifiedW.indexOf(",");
    modifiedW = modifiedW.replace(",", '');
  }
  modifiedW = modifiedW.toLowerCase().split(" ").sort().join(" ");
  let modifiedWah = wah.toLowerCase().split(" ").sort().join(" ");

  if(modifiedW == modifiedWah){
    console.log(w)
  }
})
