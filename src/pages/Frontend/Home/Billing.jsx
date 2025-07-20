import { Button, Col, Divider, Form, Image, Input, Radio, Row, Typography } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../../components/Header/Navbar'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/Auth'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../../../config/firebase'
// import Option from "./Option"


const { Title } = Typography

const initialState = { firstName:"", company:"", cityName:"", streetAddress:"", apartbment:"", phoneNumber:"", email:"", paymentMethode:"" }
const Billing = () => {

  const { user } = useAuthContext()

  const [state, setState] = useState(initialState)
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [isProcessing,setIsProcessing]=useState(false)

  const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))



  const fetchCart = useCallback(async () => {
    if (user?.uid) {

      const q = query(collection(db, "cart"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const todos = [];
      querySnapshot.forEach((docSnap) => {
        const todo = { id: docSnap.id, ...docSnap.data() };
        todos.push(todo);
      });


      setCart(todos);

      const docRef = doc(db, "cartTotal", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data()


        setTotal(data.totalPrice)
      } else {
        // docSnap.data() will be undefined in this case
        window.toastify("Someting error while getting total", "error")
      }

    }
  }, [user?.uid]);

  useEffect(() => { fetchCart() }, [fetchCart]);

  const handleSubmit = async() => {
    const { firstName, company, cityName, streetAddress, apartment, phoneNumber, email, paymentMethode } = state
    const firstNameTrim = firstName.trim()
    const companyTrim = company.trim()
    const cityNameTrim = cityName.trim()

    if (firstNameTrim.length < 3) {
      return window.toastify("Please enter Your correct Name", "error")
    }
    if (cityNameTrim.length < 5) {
      return window.toastify("Please enter Your correct Name", "error")
    }

    const bill = { firstName:firstNameTrim, company:companyTrim, cityName:cityNameTrim, streetAddress, apartment, phoneNumber, email, paymentMethode, uid: user.uid, totalPrice: total, id: window.getRandomId(),cart:cart }
           
    console.log('bill', bill)

    setIsProcessing(true)
    // try {
    //   await setDoc(doc(db, "order", bill.id), bill);

    //   window.toastify("Your order received you with in 8 to 16 days", "success")
    // } catch (e) {
    //   window.toastify("Something error in ordering", "error")
    //   console.error("Error adding document: ", e);
    // } finally {
    //   setIsProcessing(false)
    // }
    
    try {
  await setDoc(doc(db, "order", bill.id), bill);

  for (let item of cart) {
    await deleteDoc(doc(db, "cart", item.id));
  }

  setCart([]); // Clear local cart
  window.toastify("Your order received you within 8 to 16 days", "success");
  navigate("/thanks-for-shop"); // ✅ move this here
} catch (e) {
  window.toastify("Something error in ordering", "error");
  console.error("Error adding document: ", e);
} finally {
  setIsProcessing(false);
}

  }
  console.log('state', state)
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="container">
        <Row>
          <Col span={24} className='mt-3'>
            <Title level={5} className=''><span className='text-black opacity-50 pe-2' style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</span><span className='text-black opacity-50 '>\</span><span className='text-black opacity-50 pe-2' style={{ cursor: "pointer" }} onClick={() => navigate("/cart")}>Cart</span><span className='text-black opacity-50 '>\</span> <span className='text-black' style={{ cursor: "pointer" }} >CheckOut</span> </Title>
          </Col>
        </Row>
        <Row>
          <Col span={24} className='mt-4'>
            <Title level={2}>Billing Details</Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} lg={12} className='mt-2'>

            <Form layout='vertical'>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item label="First Name" required>
                    <Input type='text' name='firstName' style={{ background: "#00ffff" }} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Company" >
                    <Input type='text' name='company' style={{ background: "#00ffff" }} onChange={handleChange}/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="City Name" required>
                    <Input type='text' name='cityName' style={{ background: "#00ffff" }} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Street Address" required>
                    <Input type='text' name='streetAddress' style={{ background: "#00ffff" }} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Apartment,floor,etc.(optional)" required>
                    <Input type='text' name='apartment' style={{ background: "#00ffff" }} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Phone Number" required>
                    <Input type='text' name='phoneNumber' style={{ background: "#00ffff" }} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Email" required>
                    <Input type='text' name='email' style={{ background: "#00ffff" }} onChange={handleChange} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col xs={24} lg={12} className='mt-5'>
            <Col span={20}>
              <div className="table-responsive">
                <table className="table table-borderless mb-2">
                  <tbody>
                    {cart.map((product, i) => (

                      <tr key={i}>
                        <th> {product.imageURL && (
                          <Image src={product.imageURL} alt="product" style={{ width: 58, height: 58, objectFit: "cover" }} />
                        )}</th>
                        <td>{product.productName}</td>
                        <td>${product.subTotal}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </Col>
            <Col span={18}>
              <div className="d-flex d-row justify-content-between w-100">
                <h6>Subtotal</h6>
                <h6>${total}</h6>
              </div>
              <Divider />
              <div className="d-flex d-row justify-content-between w-100">
                <h6>Shipping</h6>
                <h6>Free</h6>
              </div>
              <Divider />
              <div className="d-flex d-row justify-content-between w-100 mb-2">
                <h6>Total</h6>
                <h6>${total}</h6>
              </div>
              <Radio.Group
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
                onChange={(e) => setState(s => ({ ...s, paymentMethode: e.target.value }))}
                name='paymentMethode'
                options={[
                  { value: 1, label: 'Bank Transfer' },
                  { value: 2, label: 'Cash On Delivery' },

                ]}
              />
              <Button type='primary' size='large' loading={isProcessing} danger className='py-3 px-4 mt-3 ms-2 rounded-1' onClick={handleSubmit}>Place Order</Button>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Billing