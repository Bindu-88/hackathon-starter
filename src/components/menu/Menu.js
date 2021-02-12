import React from "react";
import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";
import Button from 'react-bootstrap/Button';

class Menu extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div className="Menu">
        <h1>Kwitter</h1>
        {this.props.isAuthenticated && (
          <div id="menu-links">
            <Button variant="dark" href="/" onClick={this.handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withAsyncAction("auth", "logout")(Menu);
