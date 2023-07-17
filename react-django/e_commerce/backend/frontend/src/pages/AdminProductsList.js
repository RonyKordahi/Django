import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { listProducts, adminDeleteProduct, adminCreateProduct } from "../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../redux/constants/productConstants";
import Paginate from "../components/Paginate";

const AdminProductsList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userInfo } = useSelector(state => state.userLoginReducer);
    const { products, loading, error, page, pages } = useSelector(state => state.productsListReducer);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(state => state.productAdminDeleteReducer);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = useSelector(state => state.productAdminCreateReducer);

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            navigate("/login");
        }

        if (successCreate) {
            navigate(`/admin/products/${createdProduct._id}/edit`)
        }

        dispatch(listProducts(location.search));

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, location])

    const deleteHandler = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(adminDeleteProduct(productId));
        }
    }

    const createProductHandler = () => {
        dispatch(adminCreateProduct());
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fa-solid fa-plus" /> Create Product
                    </Button>
                </Col>
            </Row>
            {
                loading
                    ? <Loading />
                    : error
                        ? <Message variant="danger">{error}</Message>
                        : (
                            <>
                                {errorDelete && <Message variant="danger">{errorDelete}</Message>}
                                {errorCreate && <Message variant="danger">{errorCreate}</Message>}

                                <Table hover responsive bordered className="text-center">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Brand</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {products.map(product => {
                                            return (
                                                <tr key={product._id}>
                                                    <td>{product._id}</td>
                                                    <td>{product.name}</td>
                                                    <td>${product.price}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.brand}</td>
                                                    <td>
                                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                                            <Button type="button" className="btn-sm">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </Button>
                                                        </LinkContainer>
                                                        <Button
                                                            type="button"
                                                            variant="danger"
                                                            className="btn-sm"
                                                            onClick={() => deleteHandler(product._id)}
                                                        >
                                                            <i className="fa-solid fa-trash" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                                <Paginate page={page} pages={pages} isAdmin={true} />
                            </>
                        )
            }
        </>
    )
}

export default AdminProductsList