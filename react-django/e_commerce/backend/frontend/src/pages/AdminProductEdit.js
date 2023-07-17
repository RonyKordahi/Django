import axios from "axios";
import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { listProductDetails, adminUpdateProduct } from "../redux/actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../redux/constants/productConstants";

const AdminProductEdit = () => {

    const { productId } = useParams();

    const [formData, setFormData] = useState({});
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(state => state.productDetailsReducer);
    const {
        loading: loadingAdminUpdate,
        error: errorAdminUpdate,
        success: successAdminUpdate
    } = useSelector(state => state.productAdminUpdateReducer);

    useEffect(() => {

        if (successAdminUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate("/admin/products");
        }
        else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            }
            else {
                setFormData({
                    ...formData,
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    brand: product.brand,
                    category: product.category,
                    countInStock: product.countInStock,
                    description: product.description,
                })
            }
        }

    }, [productId, product, navigate])

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminUpdateProduct(productId, formData));
    }

    const fileUploadHandler = async (e) => {
        const file = e.target.files[0]

        // uploading an image MUST be with FormData
        const form = new FormData();
        form.append("image", file);

        setUploading(true);

        setFormData({
            ...formData,
            image: file.name,
        })

        try {

            const config = {
                headers: {
                    // header for uploading images
                    "Content-type": "multipart/form-data"
                }
            }

            const { data } = await axios.post(
                `/api/products/upload/${productId}/`,
                form,
                config
            )

            setUploading(false);
            setFormData({
                ...formData,
                image: data,
            })

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <>
            <Link to="/admin/products" className="btn btn-light my-3">Go Back</Link>
            {
                loading
                    ? <Loading />
                    : <>
                        {error && <Message variant="danger">{error}</Message>}

                        <h2>Edit Product</h2>

                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Product Name"
                                    value={formData.name ? formData.name : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="price" className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="$ 00.00"
                                    value={formData.price ? formData.price : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Image'
                                    value={formData.image ? formData.image : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                >
                                </Form.Control>

                                <Form.Control type="file" onChange={fileUploadHandler} />
                                {uploading && <Loading />}

                            </Form.Group>

                            <Form.Group controlId="brand" className="mb-3">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Brand"
                                    value={formData.brand ? formData.brand : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="category" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Category"
                                    value={formData.category ? formData.category : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="countInStock" className="mb-3">
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Count In Stock"
                                    value={formData.countInStock ? formData.countInStock : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="description" className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                    value={formData.description ? formData.description : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Button className="my-2" type="submit">Update</Button>
                        </Form>
                    </>
            }
        </>
    )
}

export default AdminProductEdit