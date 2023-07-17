import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

import { listProducts } from "../redux/actions/productActions";

const Homepage = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(listProducts(location.search))
    }, [dispatch, location])

    // useSelector takes a function always
    const { error, loading, products, pages, page } = useSelector(state => state.productsListReducer)

    return (
        <>
            {!location.search &&  <ProductCarousel />}
            <h1>Latest Products</h1>
            {
                loading
                    ? <Loading />
                    : error
                        ?  <Message variant="danger">{error}</Message>
                        : <Row>
                            {products.map(product => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                )
                            })}
                            <Paginate pages={pages} page={page} query={location.search} />
                        </Row>
            }
        </>
    )
}

export default Homepage