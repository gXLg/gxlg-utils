// https://stackoverflow.com/a/61548724/13008170
function jsonCompare(arg1, arg2){
  if(
    Object.prototype.toString.call(arg1) ===
    Object.prototype.toString.call(arg2)
  ){
    if(
      Object.prototype.toString.call(arg1) ===
      "[object Object]" ||
      Object.prototype.toString.call(arg1) ===
      "[object Array]"
    ){
      if(
        Object.keys(arg1).length !==
        Object.keys(arg2).length
      ){
        return false;
      }
      return (Object.keys(arg1).every(
        key => jsonCompare(arg1[key], arg2[key])
      ));
    }
    return (arg1 === arg2);
  }
  return false;
}

function jsonCopy(obj){
  if(obj instanceof Object){
    if(obj instanceof Array){
      const n = [];
      for(const o of obj){
        n.push(jsonCopy(o));
      }
      return n;
    }
    const n = { };
    for(const key in obj)
      n[key] = jsonCopy(n[key]);
    return n;
  }
  return obj;
}

module.exports = { jsonCompare, jsonCopy };
