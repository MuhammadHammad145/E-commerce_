import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebase';
import Navbar from '../../../components/Header/Navbar';
import { Col, Image, Row, Button,Typography } from 'antd';
import { useAuthContext } from '../../../context/Auth'; 
import Footer from '../../../components/Footer/Footer';


const{Title}=Typography
const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { user } = useAuthContext(); 

    const getProduct = useCallback(async () => {
        try {
            const docRef = doc(db, "products", id); 
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            window.toastify("Failed to fetch product", "error");
        }
    }, [id]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    const addToCart = async () => {
        if (!user) {
            window.toastify("Please login first.","error");
            return;
        }

        try {
            const cartRef = doc(db, "cart", user.uid); 
            await setDoc(cartRef, {
                [product.id]: {   
                    ...product,
                    quantity: 1
                }
            }, { merge: true })
            window.toastify("Product added to cart!","success");
        } catch (error) {
            console.error("Error adding to cart:", error);
            window.toastify("Failed to add to cart.","error");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">

                <Row gutter={16} className="d-flex justify-content-evenly mt-5 mb-5">
                    <Col xs={22} lg={10} className='xs-me-2 xs-ms-2'>
                        <Image
                            src={product?.imageURL}
                            style={{ width: "280px", height: "400px", objectFit: "contain" }}
                        />
                    </Col>
                    <Col xs={22} lg={10} className='xs-me-2 xs-ms-2 xs-mt-3'>
                        <h3>{product?.productName}</h3>
                        <div className="d-flex  gap-2">
                            <p className='text-danger pe-3'>${product?.price}</p>
                            <del className='text-muted'>${product?.originalPrice}</del>
                        </div>
                        <Title level={5}>{product?.description}</Title>

                        <Button type="primary" danger className='py-2 px-5' onClick={addToCart}>Add to Cart</Button> 
                    </Col>

                </Row>

            </div>
            <Footer/>
        </>
    );
};

export default Product;