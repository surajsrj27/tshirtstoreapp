import React, {useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import {isAuthenticated} from "../auth/helper/index";
import {getOrders} from "./helper/orderHelper";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const {user: { _id }, token } = isAuthenticated();

    const preload = (_id, token) => {
        getOrders(_id, token).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setOrders(data);
            }
            console.log("CHECKING:",data)
        });
    };

    useEffect(() => {
        preload(_id, token);
    },[]);

    
    const myorder = orders.filter(order => order.user._id === _id);
    console.log(myorder);

    return (
        <Base className="container bg-info p-4" title="Your Orders" description="Check all your orders here">
            { isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                    Admin Dashboard
                </Link>
            ) : (
                <Link to="/user/dashboard" className="btn btn-md btn-dark mb-3">
                    User Dashboard
                </Link>
            )}
            <div className="row bg-dark rounded">
                {orders.filter(myorder => myorder.user._id === _id).map((order, index) => (
                    <div key={index} className="col-md-8 offset-md-2 bg-white text-black mt-2 mb-2 rounded">
                        <h4>{order.user.name}</h4>
                        <p>TransactionID: {order.transaction_id}</p>
                        {order.products.map((product, index) => (
                            <h5 key={index}>{product.name} ---> ${product.price}</h5>
                        ))}
                        <p>-----------------------------</p>
                        <h4>Total Price: ${order.amount}</h4>
                    </div>
                ))}
            </div>
        </Base>
    )
}

export default Orders; 
