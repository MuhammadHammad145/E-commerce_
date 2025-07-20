import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Image, Input, InputNumber, Row, Space, Typography, Upload } from 'antd';
import { db } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth';
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../../../config/supabase';



const initialState = { productName: "", brand: "", price: "", originalPrice: "", description: "", category: "", offer: "" }

const { Title } = Typography;
const AllProduct = () => {


    let { user } = useAuthContext()
    const [products, setProducts] = useState([])

    const[file,setFile]=useState(null)

    const [state, setState] = useState(initialState)

    const [selectedTodo, setSelectedTodo] = useState(null)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate()

    const getTodos = useCallback(async () => {
        if (user) {
            setIsLoading(true)
            const q = query(collection(db, "products"));

            const querySnapshot = await getDocs(q);

            const products = []

            querySnapshot.forEach((doc) => {

                const todo = doc.data()
                products.push(todo)
                console.log("todo", todo);
            })
            setProducts(products)
            setIsLoading(false)
        }
    }, [user])

    useEffect(() => { getTodos() }, [getTodos])

    // const handleAdded = () => {
    //     let { title, location, description } = state
    //     const updateDate = { title, location, description }
    //     setState(updateDate)
    // }

    const handleUpdate = async (product) => {
        let { productName, brand, price, originalPrice, category, offer, description } = state
        let updateDate = { productName, brand, price, originalPrice, category, offer, description,imageUrl:"", modifyDate: serverTimestamp(), id: product.id }
        setState(updateDate)
        try {
            if(file){
                 const fileName = `hammad_${product.id}.jpg`

        
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
                updateDate.imageUrl=url
            }


            await setDoc(doc(db, "products", product.id), updateDate, { merge: true });
            const updateDocuments = products.map(item => {
                if (item.id === product.id)
                    return { ...product, ...updateDate }
                return item
            })
            setProducts(updateDocuments)

            window.toastify("Your product have been updated successfully", "success")


        } catch (error) {
            window.toastify("Something error will updated product", "error")
            console.error("Some thing went wrong while updating the product", error);
        }

    }
    const handleDelete = async (product) => {
        try {
            await deleteDoc(doc(db, "products", product.id));

            const filteredDocument = products.filter(item => item.id !== product.id)

            setProducts(filteredDocument)

            window.toastify("Product delete successfully", "success")

        } catch (error) {
            window.toastify("Some thing went wrong while deleting the product", "error")
            console.error("Some thing went wrong while deleting the product", error);
        }
    }


    return (

        <>
            <div className="container">
                <Row>
                    <Col span={24} className='d-flex justify-content-between'>
                        <Title className='text-center py-5'> All Product</Title>
                        <Button type="primary" className='mt-5' onClick={() => navigate("/dashboard/product/add-product")}> Add Produuts</Button>

                    </Col>
                    <Divider/>
                    <Col span={24}>

                        <div className="table-responsive">

                            <table className="table  table-striped mt-5 w-100 mb-5">
                                <thead style={{ border: "1px solid #a9a9a9", boxShadow: " inset 3px 3px 10px 10px #a9a9a9 " }}>
                                    <tr>
                                        <th >S.NO</th>
                                        <th >IMAGES</th>
                                        <th >Product Name</th>
                                        <th >Brand Name</th>
                                        <th >Original Price</th>
                                        <th >Price</th>
                                        <th >Offer</th>
                                        <th >Description</th>
                                        <th >Action</th>


                                        
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => {
                                        return (
                                            <tr key={i}>
                                                <th >{i + 1}</th>
                                                <td>{product.imageURL && <Image src={product.imageURL} alt='todo' className='rounded-circle bg-cover' style={{ width: 48, height: 48,objectFit:"cover" }} />}</td>
                                                {/* <td>{todo.id}</td> */}
                                                <td>{product.productName}</td>
                                                <td>{product.brand}</td>
                                                <td>{product.price}</td>
                                                <td>{product.originalPrice}</td>
                                                <td>{product.offer}</td>
                                                <td>{product.description}</td>
                                                

                                                <td><Space>
                                                    <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {  setSelectedTodo(product);setState(product); }}>
                                                        U
                                                    </button>
                                                    <Button size='large' type='primary' danger onClick={() => { handleDelete(product) }} >D</Button>
                                                </Space></td>

                                            </tr>

                                        )
                                    })}


                                </tbody>
                            </table>
                        </div>
                    </Col>

                </Row>
                {/* <Row className='d-flex justify-content-center'>
                    <Space>

                        <Button type='primary' size='large' style={{ maxWidth: "150px", textAlign: "center" }} onClick={() => { navigate("/dashboard/todos/add") }}>Add Pro</Button>


                        <Button type='primary' size='large' style={{ width: "150px", textAlign: "center" }} onClick={() => { navigate("/") }}>Go TO Home Page</Button>
                    </Space>
                </Row> */}
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Upload a new Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form layout='vertical'>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Product Name" required>
                                            <Input type='text' size='large' placeholder='Enter your title' name='productName' value={state.productName} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Brand" required>
                                            <Input type='text' size='large' placeholder='Enter your location' name='brand' value={state.brand} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Offer" required>
                                            <Input type='text' size='large' placeholder='write only ' name='offer' value={state.offer} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Category" required>
                                            <Input type='text' size='large' placeholder='write only ' name='category' value={state.category} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Price" required>
                                            <InputNumber prefix="$" style={{ width: '100%' }} size='large' name='price' value={state.price} onChange={(value) => setState(s => ({ ...s, price: value }))} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="original Price" required>
                                            <InputNumber prefix="$" style={{ width: '100%' }} size='large' name='originalPrice' value={state.originalPrice} onChange={(value) => setState(s => ({ ...s, originalPrice: value }))} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Description">
                                            <Input.TextArea size='large' placeholder='Enter your Product description' name='description' value={state.description} rows={5} style={{ resize: "none" }} onChange={handleChange} />
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
                                    <Col span={24} >


                                        <Button type='primary' danger className='md-m-2 sm-m-2 xs-m-2 ' htmlType='submit' size='large' block loading={isLoading} onClick={() => handleUpdate(selectedTodo)}>Upload a Product</Button>
                                    </Col>









                                </Row>
                            </Form>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default AllProduct