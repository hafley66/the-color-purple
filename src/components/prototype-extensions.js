
Number.prototype.truncate = function(decimalPlaces=2) {
  var strN = this + ''
  var [lhs, rhs] = strN.split('.')
  if(strN.indexOf('e') !== -1)
  	debugger
  var ret;
  if (rhs)
    ret = [lhs, rhs.slice(0, decimalPlaces)].join('.')
  else
    ret = lhs
  return Number(ret);
}

Number.prototype.hasExp = function() {
  return (this + '').indexOf('e') > -1
}

String.prototype.trimLast = function() {
  return this.slice(0, this.length - 1);
}