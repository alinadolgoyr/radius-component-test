import './App.scss';

import "./fonts/LLRiformaFamily/RiformaLL-Regular.otf"

import AutoLayout from './components /autolayout.component';
import data from './coreSmallDataSet.json'
function App() {



let cssString = '';
const finalVarArray = [];

const createVars = (dataSet, cssString, array) => {
  let finalString = ''
  for (let key in dataSet) {
    if (key === "value") {
     finalString = appendItem(`:${dataSet[key]}`, cssString); 
      array.push(finalString)
      console.log(array)
      return (array);
    }
    else {
      console.log('cssString', cssString, 'finalString', finalString)

      finalString = cssString;
      finalString = appendItem(`-${key}`,finalString);
      createVars(dataSet[key], finalString, array)
    }
  }
}


const appendItem = (item, currentName) => {
    if (!currentName) { return `$${item}` }
    else {
  return (currentName.concat(item))
    }
}

let something=createVars(data, cssString, finalVarArray);
console.log('end result', something)

return (
    <div className="App">
        <AutoLayout />
    </div>
  );
}

export default App;
