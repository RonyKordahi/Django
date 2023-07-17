import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import Search from "./Search";

const Header = () => {

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userLoginReducer);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary" collapseOnSelect >
                <Container>

                    {/* bootstrap compatible rrd link */}
                    <LinkContainer to="/">
                        <Navbar.Brand>RonyShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Search />

                            {/* bootstrap compatible rrd link */}
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart" />
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo
                                    ? (
                                        <NavDropdown title={userInfo.name} id="username">
                                            <LinkContainer to="/profile">
                                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                            </LinkContainer>

                                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    )
                                    : (
                                        // bootstrap compatible rrd link
                                        <LinkContainer to="login">
                                            <Nav.Link href="/login">
                                                <i className="fa-solid fa-user" />
                                                Login
                                            </Nav.Link>
                                        </LinkContainer>
                                    )
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title="Admin" id="admin-menu">
                                        <LinkContainer to="/admin/users">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/admin/products">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/admin/orders">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header