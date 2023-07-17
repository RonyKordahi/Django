import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { getUsersList, deleteUser } from "../redux/actions/userActions";

const AdminUsersList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { success: successDelete } = useSelector(state => state.userDeleteReducer);
    const { userInfo } = useSelector(state => state.userLoginReducer);
    const { users, loading, error } = useSelector(state => state.usersListReducer);

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(getUsersList())
        }
        else {
            navigate("/login")
        }

    }, [dispatch, successDelete, navigate, userInfo])

    const deleteHandler = (userId) => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId));
        }
    }

    return (
        loading
            ? <Loading />
            : error
                ? <Message variant="danger">{error}</Message>
                : (
                    <>
                        <h1>Users</h1>
                        <Table hover responsive bordered className="text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? "✅" : "❌"}</td>
                                            <td>
                                                <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                                    <Button type="button" className="btn-sm">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button type="button" variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                                    <i className="fa-solid fa-trash" />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </>
                )
    )
}

export default AdminUsersList