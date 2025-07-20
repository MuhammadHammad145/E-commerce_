import React, { useState } from 'react'
import { Col, Form, Input, Row, Upload, Button, Typography, InputNumber } from 'antd'
// import { useAuthContext } from '../../../context/Auth'
import { supabase } from '../../../config/supabase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import Topbar from '../../../components/Header/Topbar'
import Navbar from '../../../components/Header/Navbar'
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'



const { Title } = Typography

const initialState = { productName: "", brand: "", price: "", originalPrice: "", description: "", category: "", offer: "" }
const AddProduct = () => {

    const navigate = useNavigate()

    // const { user } = useAuthContext()
    const [file, setFile] = useState(null)

    const [state, setState] = useState(initialState)

    const [count, setCount] = useState(1)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {

        e.preventDefault()

        let { productName, brand, price, originalPrice, category, offer, description } = state
        console.log('state', state)

        const product = { id: window.getRandomId(), imageURL: "", productName, brand, price, originalPrice, description, category, offer, createdAt: serverTimestamp(), number: "" }

        console.log('product', product)
        setIsProcessing(true)
        if (file) {
            handleUpdateImage(product)
        } else {

            createDocument(product)
        }

    }

    const handleUpdateImage = async (product) => {



        const fileName = `hammad_${product.id}.jpg`

        // This code copied from supabase storage.
        const { data, error } = await supabase.storage.from('hammad.2').upload(fileName, file)

        if (error) {
            console.error('Upload error:', error);
            window.toastify('Upload failed', 'error');
        } else {
            console.log('Upload success:', data);
            console.log('filename', fileName)
            window.toastify('Image uploaded successfully', 'success');

        }


        const url = `https://oonhohlbdybxcftwzhbb.supabase.co/storage/v1/object/public/hammad.2/${fileName}`

        createDocument({ ...product, imageURL: url })
    }
    const createDocument = async (product) => {

        try {
            const newCount = count + 1
            setCount(newCount)
            await setDoc(doc(db, "products", product.id), { ...product, number: newCount });

            window.toastify("User profile creatimg successfully", "success")
        } catch (error) {
            window.toastify("Error creating by user profile", "error")
            console.error("Error adding document: ", error);
        } finally {
            setIsProcessing(false)
        }
    }


    return (
        <>
            <Topbar />
            <Navbar />
            <main>
                <div className="container">
                    <div className="card shadow p-3 mb-5 bg-body-tertiary rounded  p-md-4 p-lg-5 mt-3 " >


                        <Title level={3}>Upload a new Product</Title>
                        <Form layout='vertical'>
                            <Row gutter={[16,16]}>
                                <Col span={12}>
                                    <Form.Item label="Product Name" required>
                                        <Input type='text' size='large' placeholder='Enter your title' name='productName' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Brand" required>
                                        <Input type='text' size='large' placeholder='Enter your location' name='brand' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Offer" required>
                                        <Input type='text' size='large' placeholder='write only ' name='offer' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Category" required>
                                        <Input type='text' size='large' placeholder='write only ' name='category' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Price" required>
                                        <InputNumber prefix="$" style={{ width: '100%' }} size='large' name='price' onChange={(value) => setState(s => ({ ...s, price: value }))} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="original Price" required>
                                        <InputNumber prefix="$" style={{ width: '100%' }} size='large' name='originalPrice' onChange={(value) => setState(s => ({ ...s, originalPrice: value }))} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Description">
                                        <Input.TextArea size='large' placeholder='Enter your Product description' name='description' rows={5} style={{ resize: "none" }} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Image">
                                        <Upload
                                            beforeUpload={(file) => {
                                                setFile(file);
                                                return false; // Prevent automatic upload
                                            }}
                                            showUploadList={false}
                                        >
                                            <Button icon={<UploadOutlined />}>Click to Select File</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>



                                <Col xs={24} lg={12}  >
                                    

                                        <Button type='primary' className='md-m-2 sm-m-2 xs-m-2 ' htmlType='submit' size='large' block loading={isProcessing} onClick={handleSubmit}>Upload a Product</Button>
                                    

                                </Col>
                                <Col xs={24} lg={12}>

                                        <Button type='primary' size='large' block onClick={() => { navigate("/dashboard/product") }}>Show All Products</Button>
                                </Col>








                            </Row>
                        </Form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AddProduct