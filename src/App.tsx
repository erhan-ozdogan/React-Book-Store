import * as React from 'react';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class App extends React.Component{
    render(){
        return(
            <Router>
            <div className="App">
                <nav>
                    <ul>
                        <Link to="/header"><li>Header</li></Link>  
                        <Link to="/"><li>Home</li></Link>        
                    </ul>
                </nav>
                
                    <Switch>

                    <Route path="/header" component={Header}/>
                    </Switch>
                
            </div>
            </Router>
        );
    }
}

export default App;