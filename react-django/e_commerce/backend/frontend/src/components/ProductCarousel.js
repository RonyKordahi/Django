import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";
import Message from "./Message";

import { listTopProducts } from "../redux/actions/productActions";

const ProductCarousel = () => {

    const dispatch = useDispatch();

    const { products, error, loading } = useSelector(state => state.productTopRatedReducer);

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch])

    return (
        loading
            ? <Loading />
            : error
                ? <Message variant="danger">{error}</Message>
                : (
                    <Carousel pause="hover" className="bg-dark">
                        {products.map(product => {
                            return (
                                <Carousel.Item key={product._id}>
                                    <Link to={`/product/${product._id}`}>
                                        <Image src={product.image} alt={product.name} fluid />
                                        <Carousel.Caption className="carousel.caption">
                                            <h4>{product.name} (${product.price})</h4>
                                        </Carousel.Caption>
                                    </Link>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                )
    )
}

export default ProductCarousel;