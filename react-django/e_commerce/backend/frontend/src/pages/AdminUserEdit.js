import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { getUserDetails, adminUpdateUser, } from "../redux/actions/userActions";
import { USER_ADMIN_UPDATE_RESET } from "../redux/constants/userConstants";

const AdminUserEdit = () => {

    const { userId } = useParams();

    const [formData, setFormData] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, user } = useSelector(state => state.userDetailsReducer);
    const {
        loading: loadingAdminUpdate,
        error: errorAdminUpdate,
        success: successAdminUpdate
    } = useSelector(state => state.userAdminUpdateReducer);

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminUpdateUser(userId, formData));
    }

    useEffect(() => {
        
        if (successAdminUpdate) {
            dispatch({ type: USER_ADMIN_UPDATE_RESET });
            navigate("/admin/users");
        }
        else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            }
            else {
                const [fname, lname] = user.name.split(" ");
                setFormData({
                    ...formData,
                    _id: user._id,
                    first_name: fname,
                    last_name: lname,
                    email: user.email,
                    staff: user.isAdmin,
                })
            }
        }

    }, [userId, user, navigate, successAdminUpdate])

    return (
        <>
            <Link to="/admin/users" className="btn btn-light my-3">Go Back</Link>
            {
                loading
                    ? <Loading />
                    : <>
                        {error && <Message variant="danger">{error}</Message>}

                        <h2>Edit User</h2>

                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId="first_name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.first_name ? formData.first_name : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="last_name" className="my-2">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.last_name ? formData.last_name : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="my-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={formData.email ? formData.email : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="staff" className="my-2">
                                <Form.Label>Admin</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    checked={formData.staff ? formData.staff : false}
                                    onChange={(e) => changeHandler(e.target.id, e.target.checked)}
                                />
                            </Form.Group>

                            <Button className="my-2" type="submit">Update</Button>
                        </Form>
                    </>
            }
        </>
    )
}

export default AdminUserEdit;