import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, where, setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Row, Col, Image, Spin, Card, Typography, Divider } from 'antd';
import { useAuthContext } from '../../../context/Auth';
import { MdDeleteForever } from 'react-icons/md';
import Navbar from '../../../components/Header/Navbar';
import { Link } from 'react-router-dom';


const { Title } = Typography
const Cart = () => {
    const { user } = useAuthContext();
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const fetchCart = useCallback(async () => {
        if (user?.uid) {
            setIsLoading(true);
            const q = query(collection(db, "cart"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const todos = [];
            querySnapshot.forEach((docSnap) => {
                const todo = { id: docSnap.id, ...docSnap.data() };
                todos.push(todo);
            });

            setCart(todos);

            const initialQuantities = {};
            todos.forEach(item => {
                initialQuantities[item.id] = item.num || 1;
            });
            // console.log('initialQuantities', initialQuantities)
            setQuantities(initialQuantities);
            setIsLoading(false);


        }
    }, [user?.uid]);

    useEffect(() => { fetchCart() }, [fetchCart]);

    const updateQuantity = async (product, change) => {
        const newQuantity = Math.max((quantities[product.id] || 1) + change, 1);

        const subTotal = newQuantity * product.price;

        const updatedData = {
            num: newQuantity,
            subTotal,
            modifyDate: serverTimestamp()
        };

        try {
            await setDoc(doc(db, "cart", product.id), updatedData, { merge: true });
            const updateDocuments = cart.map(item => {
                if (item.id === product.id)
                    return { ...item, ...updatedData }
                return item
            })
            setCart(updateDocuments)
            setQuantities(prev => ({ ...prev, [product.id]: newQuantity }));
            window.toastify("Quantity updated", "success");


        } catch (error) {
            console.error("Error updating cart:", error);
            window.toastify("Error updating quantity", "error");
        }
    };

    const handleDelete = async (product) => {
        const number = product.number - 1
        const updatedData = { number }

        try {
            await setDoc(doc(db, "cart", product.id), updatedData, { merge: true });
            const updateDocuments = cart.map(item => {
                if (item.id === product.id)
                    return { ...item, ...updatedData }
                return item
            })
            setCart(updateDocuments)
            await deleteDoc(doc(db, "cart", product.id));

            const filteredDocument = cart.filter(item => item.id !== product.id)

            setCart(filteredDocument)

            window.toastify("Upadate and delete success fuly", "success")

        } catch (error) {
            window.toastify("Something error went wrong while deleting the product", "error")
            console.error("Something error went wrong while deleting the product", error);
        }
    }

    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + (product.subTotal || 0), 0)
    }
    // const getTotalQuantity=()=>{
    //     return cart.reduce((total, product)=>total +(product.num || 0),0)
    // }
    // const totalQuantity=getTotalQuantity()
    // const quantity={totalQuantity,id:user.uid}
    // await setDoc(doc(db, "quantity", user.uid), totalQuantity);

    const handleAdded = async () => {
        if (cart.length > 0) {

            const totalPrice = getTotalPrice()
            const price = { id: user.uid, totalPrice }
            await setDoc(doc(db, "cartTotal", user.uid), price);
        } else {
            return window.toastify("Your cart have been apmett", "error")
        }

    }




    // useEffect(() => {
    //     const saveTotalPrice = async () => {
    //         const totalPrice = getTotalPrice(); 
    //         await setDoc(doc(db, "cartTotal", user.uid), totalPrice); 
    //     };

    //     if (cart.length > 0) { 
    //         saveTotalPrice();
    //     }
    // }, [cart]);

    //  useEffect(async() => {
    //     temp=0
    //     cart.forEach((item)=>{
    //         temp=temp+parseInt(item.subTotal || item.price)
    //     })
    //     setTotal(temp)
    //      await setDoc(doc(db, "cartTotal", user.uid), temp); 

    //     // return cart.reduce((total, product) => total + (product.subTotal || 0), 0)
    // },[cart])

    return (

        <>

            <Navbar />
            <div className="container">

                <Row>
                    <Col span={24}>
                        {isLoading && <Spin />}
                        <div className="table-responsive">

                            <table className="table mt-5">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((product, i) => (
                                        <tr key={i}>
                                            <td>
                                                {product.imageURL && (
                                                    <Image src={product.imageURL} alt="product" style={{ width: 58, height: 58, objectFit: "cover" }} />
                                                )}
                                            </td>
                                            <td>${product.price}</td>
                                            <td>
                                                <div className='py-2 rounded-1 d-flex align-items-center justify-content-center' style={{ border: "0.2px solid #20b2aa", fontSize: "15px", width: "50px" }}>
                                                    <span className='pe-2 ' style={{ cursor: "pointer" }} onClick={() => updateQuantity(product, -1)}>-</span>
                                                    {quantities[product.id] || 1}
                                                    <span className='ps-2' style={{ cursor: "pointer" }} onClick={() => updateQuantity(product, 1)}>+</span>
                                                </div>
                                            </td>
                                            <td>${product.subTotal || product.price}</td>

                                            {/* <td><BsTrash3Fill onClick={()=>handleDelete(product)} size={20} color="#696969" style={{ cursor: 'pointer',marginRight:"5px" }} /></td> */}
                                            <td><MdDeleteForever onClick={() => handleDelete(product)} size={20} color="#b22222" style={{ cursor: 'pointer' }} /></td>
                                            {/* <td>${product.subTotal}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
                <Row className='ms-auto'>
                    <Col lg={24} xs={24} className='d-flex align-items-center justify-content-center'>
                        <Link to='/' className='btn rounded-1 border' >Return To Shop</Link>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={24} lg={24}>
                        <Card className='py-1 px-4 ms-auto mb-3' style={{ width: "360px", height: "334px", border: "1px solid black" }}>
                            <Title level={4} className='mb-2'> Cart Total</Title>
                            <div className='w-100 d-flex d-row justify-content-between'>
                                <h5 className='fw-lighter'>SubTotal:</h5>
                                <h5 className='fw-lighter'>${getTotalPrice()}</h5>
                            </div>
                            <Divider />
                            <div className='w-100 d-flex d-row justify-content-between'>
                                <h5 className='fw-lighter'>Shipping:</h5>
                                <h5 className='fw-lighter'>Free</h5>
                            </div>
                            <Divider />
                            <div className='w-100 d-flex d-row justify-content-between mb-2'>
                                <h5 className='fw-lighter'>Total:</h5>
                                <h5 className='fw-lighter'>${getTotalPrice()}</h5>
                            </div>
                            <div className="w-100 d-flex justify-content-center">

                                <Link to='/billing' type='primary' danger className='btn rounded-0 bg-danger text-white' onClick={handleAdded} >Process to checkout</Link>
                            </div>

                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Cart;