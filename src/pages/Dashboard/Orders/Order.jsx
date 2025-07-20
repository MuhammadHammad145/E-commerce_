import React, { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/Auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Card, Col, Row,Typography } from 'antd';
 

const {Title}=Typography
const Order = () => {



  const { user } = useAuthContext()

  const [order, setOrder] = useState([])

  const fetchCart = useCallback(async () => {
    if (user?.uid === "h0Iv9YZ6p8NcnecthlkrK7L9Agy1") {

      const q = query(collection(db, "order"));
      const querySnapshot = await getDocs(q);

      const todos = [];
      querySnapshot.forEach((docSnap) => {
        const todo = { id: docSnap.id, ...docSnap.data() };
        todos.push(todo);
      });


      setOrder(todos);



    }
  }, [user?.uid]);

  useEffect(() => { fetchCart() }, [fetchCart]);


  return (
    <>
      <div className="container mt-4">
        <Title level={3} className='text-center'>All Orders</Title>

        <Row gutter={[24, 24]}>
          {order.map((order, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                title={`Order ID: ${order.id}`}
                className='shadow p-3  bg-body-tertiary rounded '
                border={true}
                
              >
                <p><b>Name:</b> {order.firstName}</p>
                <p><b>City:</b> {order.cityName}</p>
                <p><b>Address:</b> {order.streetAddress}, {order.apartment}</p>
                <p><b>Phone:</b> {order.phoneNumber}</p>
                <p><b>Email:</b> {order.email}</p>
                <p><b>Payment:</b> {order.paymentMethode === 1 ? "Bank Transfer" : "Cash on Delivery"}</p>
                <p><b>Total:</b> ${order.totalPrice}</p>
              <div className="table-responsive">

                <table className="table table-sm table-bordered mt-3">
                  <thead className='table-light'>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Sub</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <img src={item.imageURL} alt={item.productName} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.num}</td>
                        <td>${item.subTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    </>
  )
}

export default Order