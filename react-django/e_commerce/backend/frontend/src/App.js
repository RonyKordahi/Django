import Container from 'react-bootstrap/Container';
import styled from "styled-components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import GlobalStyles from "./styles/GlobalStyles";

import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Shipping from "./pages/Shipping";
import Homepage from "./pages/Homepage";
import OrderDetails from "./pages/OrderDetails";
import ProductDetails from "./pages/ProductDetails";

import AdminUserEdit from "./pages/AdminUserEdit";
import AdminUsersList from "./pages/AdminUsersList";
import AdminOrdersList from "./pages/AdminOrdersList";
import AdminProductEdit from "./pages/AdminProductEdit";
import AdminProductsList from "./pages/AdminProductsList";

const App = () => {
    return (
        <Router>
            <GlobalStyles />
            <Header />
            <Main className="py-3">
                <Container>
                    <Routes>
                        {/* regular routes */}
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/cart/:productId?" element={<Cart />} />
                        <Route path="/order/:orderId" element={<OrderDetails />} />
                        <Route path="/product/:productId" element={<ProductDetails />} />
                        
                        {/* Admin routes */}
                        <Route path="/admin/users" element={<AdminUsersList />} />
                        <Route path="/admin/users/:userId/edit" element={<AdminUserEdit />} />
                        
                        <Route path="/admin/products" element={<AdminProductsList />} />
                        <Route path="/admin/products/:productId/edit" element={<AdminProductEdit />} />
                        
                        <Route path="/admin/orders" element={<AdminOrdersList />} />
                    </Routes>
                </Container>
            </Main>
            <Footer />
        </Router>
    );
}

const Main = styled.main`
    min-height: 80vh;
`

export default App;