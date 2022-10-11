import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from "./App"
import About from "./pages/About"
import Order from "./pages/Order"
import Invoice from "./pages/Invoice"

ReactDOM.render(
    <Router>
        <div className='appContainer'>
            <main className='mainContainer'>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/order" component={Order} />
                <Route path="/invoice" component={Invoice} />
            </main>
        </div>
    </Router>, 
    document.getElementById("root")
    
)
