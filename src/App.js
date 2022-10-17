import React, { useState, useContext, useEffect } from 'react';
import './index.css';
import { Route, useHistory } from 'react-router-dom'
import About from "./pages/About"
import Order from "./pages/Order"
import Invoice from "./pages/Invoice"
import Pay from "./pages/Pay"
import Clients from "./pages/Clients"
import TablesBooked from "./pages/TablesBooked"
import GenerateMenu from "./pages/GenerateMenu"
import MenuQr from "./pages/MenuQr"
import IncomeReport from "./pages/Income"
import Login from "./pages/Login"
import { UserContext } from './context/UserContext';

const App = () => {
  const history = useHistory()
  const [user, setUser] = useState(null);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext) {
      if (!userContext.user) {
        history.push('/login');
      }
    }

    if (!userContext) {
      history.push('/login');
    }
  }, [history, userContext])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Route exact path="/" component={Order} />
      <Route exact path="/about" component={About} />
      <Route exact path="/invoice" component={Invoice} />
      <Route exact path="/pay" component={Pay} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/tables" component={TablesBooked} />
      <Route exact path="/menu" component={GenerateMenu} />
      <Route exact path="/menu-qr" component={MenuQr} />
      <Route exact path="/income" component={IncomeReport} />
    </UserContext.Provider>
  );
}

export default App;
