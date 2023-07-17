import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StyledLink } from "../styles/styled-components";

import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded" >

            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>

                <StyledLink to={`/product/${product._id}`}>
                    <Card.Title as="div">{product.name}</Card.Title>
                </StyledLink>

                <Card.Text as="div" className="my-3">
                    <Rating rating={product.rating} numReviews={product.numReviews} color={"#f8e825"} />
                </Card.Text>

                <Card.Text as="h3" className="p-1">${product.price}</Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Product