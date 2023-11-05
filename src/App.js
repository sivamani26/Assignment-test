import React from 'react';
import ItemList from '../src/components/ItemList'
import "./App.css"

function App() {

  return (
    <div className="App">
      <div className='App_container'>
      <h1>Please select the multiple Products</h1>
      <ItemList/>
      </div>
    </div>
  );
}

export default App;
