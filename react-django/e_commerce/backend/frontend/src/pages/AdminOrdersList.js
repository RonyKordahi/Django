import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { getAdminOrders } from "../redux/actions/orderActions";

const AdminOrdersList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector(state => state.userLoginReducer);
    const { orders, loading, error } = useSelector(state => state.orderAdminListReducer);

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(getAdminOrders())
        }
        else {
            navigate("/login")
        }

    }, [dispatch, navigate, userInfo])

    return (
        loading
            ? <Loading />
            : error
                ? <Message variant="danger">{error}</Message>
                : (
                    <>
                        <h1>Orders</h1>
                        <Table hover responsive bordered className="text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user.name}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : "❌"}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "❌"}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button type="button" className="btn-sm">
                                                        Details
                                                    </Button>
                                                </LinkContainer>
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

export default AdminOrdersList;