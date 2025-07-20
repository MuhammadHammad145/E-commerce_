import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Space, Tooltip, Typography } from 'antd';
import { FiHeart } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

const { Title } = Typography
const Navbar = () => {

  const { isAuth, user, handleLogOut } = useAuthContext()

  // const [cart,setCart]=useState([])
  const [quantities, setQuantities] = useState(0)

  const fetchCart = useCallback(async () => {
    if (user?.uid) {

      const q = query(collection(db, "cart"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let total = 0;
        querySnapshot.forEach(doc => {
          const data = doc.data();
          total += data.num || 1;  // use `num` instead of `number`
        });
        setQuantities(total);
      });

      return () => unsubscribe();



    }

  }, [user?.uid]);

  useEffect(() => { fetchCart() }, [fetchCart]);
  return (
    <header className='top p-3  bg-body-tertiary' >
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark ">
        <div className="container ">
          <a className="navbar-brand" ><b>Exclusive</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link active" aria-current="page" >Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link active" aria-current="page" >About</Link>
              </li>
              <li className="nav-item">
                {!isAuth
                  ? <Link to="/auth/register" className="nav-link active ps-2" aria-current="page" >Sign Up</Link>
                  : <Title level={5} className='pt-2 fw-normal ps-2 text-white' onClick={() => handleLogOut()} style={{ cursor: "pointer" }}>Logout</Title>
                }
              </li>
              {/* <li className="nav-item">
          {user?.uid === "h0Iv9YZ6p8NcnecthlkrK7L9Agy1"
          ?<Link to="/dashboard/product" className="nav-link active ps-2" aria-current="page" >Dashboard</Link>
          :<></>

          }

        </li> */}

            </ul>
            <div className='d-flex rounded-1' style={{ backgroundColor: "transparent" ,color:"white"}}>

              <input  className="form-control" style={{ border: "none",backgroundColor:"transparent" }} placeholder="What are you look for?" />
              <FiSearch className="pt-1" style={{ marginLeft: '8px', width: 28, height: 28,color:"white" }} />
            </div>
            <Space> <FiHeart className='ms-3 pb-1 ' style={{ width: 28, height: 28,color:"white" }} />
              {user?.uid
                ? <Badge count={quantities}><Link to="/cart"><Tooltip title={user.name}><FiShoppingCart title="Cart " className='ms-3 pb-1' style={{ width: 28, height: 28, color: "white" }} /></Tooltip></Link></Badge>
                : <FiShoppingCart title="Cart " className='ms-3 pb-1' style={{ width: 28, height: 28, color: "white" }} />

              }

              {user?.uid === "h0Iv9YZ6p8NcnecthlkrK7L9Agy1"
                ? <Link to="/dashboard/product/all-product" className="btn btn-outline-success text-white" aria-current="page" >Dashboard</Link>
                : <></>

              }

            </Space>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar