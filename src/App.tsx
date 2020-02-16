import * as React from 'react';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import List from './pages/list';

class App extends React.Component{


    render(){
        return(
            <div className="App">
                <List/>
           
                
            </div>
            
        );
    }
}



export default App;