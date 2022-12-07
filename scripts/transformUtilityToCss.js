import {writeFile} from 'fs'
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url)
const data = require('../src/tokens.json')


const writeToNewFile = async (array) => {
  let content = array.join('\n');
  const template = (content) => `
  :root {
    ${content}
    }
    `;
  let readyContent= template(content);
  await writeFile('newVars.scss', readyContent, err => {if (err) {console.log(err)}})
}


export const createVars = (dataSet, cssString, array) => {
  let finalString = ''
  for (let key in dataSet) {
    let formattedKey = stringFormatting(key);
    if (typeof dataSet[key] === 'object') {
      finalString = cssString;
      finalString = appendItem(`${formattedKey}-`,`${finalString}`);
      createVars(dataSet[key], finalString, array)
    }
    else {
      finalString = appendItem(`${dataSet[key]};`, cssString.slice(0,-1)); // the slice is to remove the last "-" of the string 
      array.push(finalString)
      return writeToNewFile(array)

    }
  }
}

// lowercase, removes white spaces and dashes
const stringFormatting = (str) => {
  let formattedStr= str.replace(/\//g,'-');
  return formattedStr.toLowerCase().replace(/\s/g,'');
}

// formats the final value 
const formatValue = (value) => {
  const bracketsAround = /[\{][a-zA-Z0-9.\-]*[\}]/;
  const isReference = (u) => u.match(bracketsAround);

  if (isReference(value) != null) {
    if (value.includes('*')) { // need to add all the calculation possibilities
    value = value.replace(/\./,'-').replace(/\{/g,'var--').replace(/\}/g,'') + ')';
    }
    else 
    {
      value = value.replace(/\{/g,'$').replace(/\}/g,'').replace(/\./,'-');
    }
  }
  return value;
}


const appendItem = (item, currentName) => {
  if (!currentName) { return `--${item}` }
  else {
return (currentName.concat(item))
  }
}

createVars(data, '', []);





