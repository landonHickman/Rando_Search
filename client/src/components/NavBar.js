import React, { useContext } from "react";
import { useHistory} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Nav, Col, Navbar, Container, Row } from "react-bootstrap";


const NavBar = () => {
  //used to send to another link
  const history = useHistory();
  // authenticated used to see if user is logged in or not.
  // handleLogout logs user out
  const { authenticated, handleLogout } = useContext(AuthContext);
  // function to position to the right of navbar.
  // also has an if else to check for user to see what is needed to display.
  const getRightNav = () => {
    if (authenticated) {
      return (
        <Col>
          <Nav.Link onClick={() => handleLogout(history)}>Logout</Nav.Link>
        </Col>
      );
    } else {
      return (
        <>
          <Col>
            <Nav.Link href="/register">Register</Nav.Link>
          </Col>
          <Col>
            <Nav.Link href="/login">Login</Nav.Link>
          </Col>
        </>
      );
    }
  };
  //this is what is being returned by the NavBar function. if you want it to show up it needs to pass
  //through here eventually.
  return (
    <>
      <Navbar bg="light" variant="light" style={{ display: "flex" }}>
        <Container fluid style={{ flexWrap: "wrap" }}>
          <Row>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              {/* <Nav.Link href="/ArticlePage">Articles</Nav.Link>
              <Nav.Link href="/examples">Examples</Nav.Link>
              <Nav.Link href="/tests">Tests</Nav.Link> */}
            </Nav>
          </Row>
          <Row>
            <Nav>{getRightNav()}</Nav>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
