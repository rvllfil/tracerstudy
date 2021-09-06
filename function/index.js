exports.arrStr = (arr) => {
  let a = [] 
  arr.map(i => {
    a = [...a, "'"+i+"'"] 
  })
  let result = a.toString()
  return result
}

exports.batch = (arrs) => {
	let result = []
  	arrs.map((arr, index) => {
      const values = Object.values(arr)
      const value = '('+this.arrStr(values)+')'
      result = [...result, value]
    })
  	return result.toString()
}

exports.data = (obj, keys) => { 
  let result = []
  keys.map(key => {
	result = [...result, key+' = '+"'"+ obj[key]+"'"]
  })
  return result
}

exports.dataLiteral = (arrs) => {
  let result = []
  arrs.map(arr => {
    result = [...result, "'"+arr+"'"]
  })
  return result
}

exports.dataAnd = (obj, keys) => { 
  let arr = []
  let result
  keys.map(key => {
	arr = [...arr, key+' = '+"'"+ obj[key]+"'"]
  })
  let str = arr.toString()
  if (keys.length > 1){
    result = str.replace(/,/g, ' AND ')
  } else {
    result = str  
  }
  return result
}