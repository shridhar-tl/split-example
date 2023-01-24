import React from 'react';
import { InputText, Button, MenuItems } from '../library/components';
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.scss';

const Home = React.lazy(() => import('./Home'));
const TaxCalculator = React.lazy(() => import('./TaxCalculator'));
const ChangePassword = React.lazy(() => import('../common/ChangePassword'));
const Profile = React.lazy(() => import('../common/Profile'));

function App() {
  return (<HashRouter>
    <div className="App">
      <MenuItems
        role='emp'
        start={<InputText placeholder="Search" type="text" />}
        end={<Button label="Logout" icon="pi pi-power-off" />}
      />
      <Routes>
        <Route exact path="/" name="Home Page" element={<Home />} />
        <Route exact path="/taxcalc" name="Tax Calculator" element={<TaxCalculator />} />
        <Route exact path="/changepassword" name="Change Password" element={<ChangePassword />} />
        <Route exact path="/profile" name="Profile Page" element={<Profile />} />
      </Routes>
    </div>
  </HashRouter>
  );
}

export default App;
