import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Create from './components/customer/Create';
import EditCustomer from './components/customer/Edit';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <Link to={'/'}>Customer List Management</Link>
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to={'/create'}>Create Customer</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/create'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(App);
