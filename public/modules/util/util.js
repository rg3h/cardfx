// @fileoverview util.js

export {
  getVersion,        // get the app version, defaults to 1.0.0, setVersion()
  getLinksFromHtml,  // given a slug of html, get the links
  isArray,           // '9949' = false; 9949 = false; ['9949'] = true
  isBrowser,         // true if running in a browser
  isInteger,         // 42 =true; 42.23 = false; '42' = false
  isNode,            // true if running as a node script
  isNumber,          //  '9949' = false; 9949 = true
  isNumeric,         //  '9949' = true; 9949 = true
  isString,          //  '9949' = true; 9949 = false
  prettyJson,        // turns json obj into a readable string
  prt,               // alias for console.log() so that it takes up less space
  saveFile,          // saves text to a file
  setVersion,        // set the app version
  sleep,             // async in seconds: await sleep(3.5) sleeps 3.5 secs
}

var appVersion = '1.0.0';

/*export*/ function getVersion() {
  return appVersion;
}


/*export*/ function setVersion(newVersion) {
  appVersion = newVersion;
}


// @summary given a string of html and optional parser, return a list of links
// @returns array of links as urls
/*export*/ function getLinksFromHtml(htmlString, domParser=null) {
  const parser = domParser ? domParser : new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  let linkList = Array.from(doc.querySelectorAll('a'))
      .map(a => ({title: a.innerText, url: a.href}));

  return linkList;
}


//  let x;
//  x = null;       console.log(x, 'f', isArray(x));         // false
//  x = 12;         console.log(x, 'f', isArray(x));         // false
//  x = "12";       console.log(`"${x}\"`, 'f', isArray(x)); // false
//  x = [];         console.log(x, 't', isArray(x));         // true
//  x = [12];       console.log(x, 't', isArray(x));         // true
//  x = ["12"];     console.log(x, 't', isArray(x));         // true
//  x = ["12", 13]; console.log(x, 't', isArray(x));         // true
/*export*/ function isArray(theVar) {
  return Array.isArray(theVar);
}


// allow infinity to be a number by default
//  let x;
//  x=42;       console.log(x, 't', isNumber(x));        // true
//  x=3.14;     console.log(x, 't', isNumber(x));        // true
//  x=NaN;      console.log(x, 'f', isNumber(x));        // false
//  x=Infinity; console.log(x, 't', isNumber(x));        // true
//  x=Infinity; console.log(x, 'f', isNumber(x, false)); // false
//  x='42';     console.log(x, 'f', isNumber(x));        // false
/*export*/ function isNumber(theVar, allowInfinity=true) {
  if (allowInfinity) {
    return typeof theVar === 'number' && !Number.isNaN(theVar);
  } else {
    return typeof theVar === 'number' && Number.isFinite(theVar);
  }
}


// allow infinity to be a number by default
//  let x;
//  x=123;      console.log(x,        't', isNumeric(x));   // true
//  x="123";    console.log(`"${x}"`, 't', isNumeric(x));   // true
//  x="3.14";   console.log(`"${x}"`, 't', isNumeric(x));   // true
//  x="   ";    console.log(`"${x}"`, 'f', isNumeric(x));   // false
//  x=null;     console.log(x,        'f', isNumeric(x));   // false
//  x=true;     console.log(x,        'f', isNumeric(x));   // false
//  x=Infinity; console.log(x,        't', isNumeric(x));   // true
//  x=Infinity; console.log(x,        'f', isNumeric(x, false));   // false
/*export*/ function isNumeric(theVar, allowInfinity=true) {
  if (allowInfinity) {
    return (typeof theVar === 'string' && theVar.trim() !== '')
      ? Number.isFinite(+theVar)
      : typeof theVar === 'number' && !Number.isNaN(theVar);
  } else {
    return (typeof theVar === 'string' && theVar.trim() !== '')
      ? Number.isFinite(+theVar)
      : typeof theVar === 'number' && Number.isFinite(theVar);
  }
}

// allow infinity to be a ninteger by default
//  let x;
//  x=10;       console.log(x,        't', isInteger(x));        // true
//  x=10.5;     console.log(x,        'f', isInteger(x));        // false
//  x="10";     console.log(`"${x}"`, 'f', isInteger(x));        // false
//  x=Infinity; console.log(x,        't', isInteger(x));        // true
//  x=Infinity; console.log(x,        'f', isInteger(x, false)); // false
//  x=NaN;      console.log(x,        'f', isInteger(x));        // false
//  x=NaN;      console.log(x,        'f', isInteger(x, false)); // false
/*export*/ function isInteger(theVar, allowInfinity=true) {
  if (allowInfinity) {
    return Number.isInteger(theVar) ||
      (typeof theVar == 'number' &&
       !Number.isFinite(theVar) &&
       !Number.isNaN(theVar));
  } else {
    return Number.isInteger(theVar);
  }
}


//  let x;
//  x = null;     console.log(x,         'f', isString(x)); // false
//  x = 12;       console.log(x,         'f', isString(x)); // false
//  x = "12";     console.log(`"${x}\"`, 't', isString(x)); // false
//  x = NaN;      console.log(x,         'f', isString(x)); // false
//  x = Infinity; console.log(x,         'f', isString(x)); // false
/*export*/ function isString(theVar) {
  return typeof theVar === 'string';
}


/*export*/ function isBrowser() {
  return typeof window === 'object'
}


/*export*/ function isNode() {
  return typeof process === 'object';
}

// alias for console.log() so that it takes up less space
/*export*/ function prt(...args) {
  console.log(...args);
}

/*export*/ function saveFile(fileName, text) {
  const blob = new Blob([text], {type:"text/plain;charset=utf-8"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}

// can be fractions of a second: await sleep(3.5);  // sleep for 3.5 seconds
/*export*/ function sleep(seconds) {
  let ms = seconds * 1000;
  return new Promise((r) => setTimeout(r,ms));
}


// turns json obj into a readable string
/*export*/ function prettyJson(json) {
  return JSON.stringify(json, null, 2);
}
