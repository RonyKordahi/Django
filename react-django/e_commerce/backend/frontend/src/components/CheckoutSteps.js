import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ s1, s2, s3, s4 }) => {
    return (
        <Nav className="justify-content-center mb-4">

            <Nav.Item>
                <LinkContainer to="/cart" disabled={!s1}>
                    <Nav.Link>Cart</Nav.Link>
                </LinkContainer>
            </Nav.Item>

            <Nav.Item>
                <LinkContainer to="/shipping" disabled={!s2}>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
            </Nav.Item>

            <Nav.Item>
                <LinkContainer to="/payment" disabled={!s3}>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
            </Nav.Item>

            <Nav.Item>
                <LinkContainer to="/order" disabled={!s4}>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps;