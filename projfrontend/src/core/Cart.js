import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper/index";

import PaymentB from './PaymentB';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = products => {
    return (
      <div>
        <h2>Your T-shirts</h2>
          {products.map((product, index) => {
            return(
              <div className="mb-4">
                <Card
                  key={index}
                  product={product}
                  removeFromCart={true}
                  addtoCart={false}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            )
          })}
      </div>
    );
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    })
    return amount;
  }

  const loadCheckout = (products)=> {
    return (
      <div>
        {products.length > 0 ? (
          <div>
            <PaymentB products={products} setReload={setReload} />
          </div>
          ) : (
          <div>
            <h4>Add products to cart</h4>
          </div>
        )} 
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No products</h4>
          )}
        </div>
        <div className="col-6">
          {isAuthenticated() ? loadCheckout(products) : (
            <div><h4>Please Signin to Buy</h4></div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
