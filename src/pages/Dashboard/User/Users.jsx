import React, { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/Auth'
import { db } from '../../../config/firebase'
import { collection, getDocs, query } from 'firebase/firestore'
import { Col, Row, Spin,Typography } from 'antd'


const{Title}=Typography
const Users = () => {

    const { user } = useAuthContext()

    const [Users, setUsers] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const getUsers = useCallback(async () => {
        setIsLoading(true)
        if (user) {

            const q = query(collection(db, "users"));

            const querySnapshot = await getDocs(q);

            const Users = []

            querySnapshot.forEach((doc) => {

                const userData= doc.data()
                Users.push(userData)
                console.log("Users", Users);
            })
            setUsers(Users)
            setIsLoading(false)

        }
    }, [user])

    useEffect(() => { getUsers() }, [getUsers])


    return (
        <div className="container">

            <Row>
                <Col span={24}>
                <Title  level={3} className='text-center mt-5 mb-5'>ALL Users</Title>
                </Col>
            </Row>

            <div className='d-flex align-items-center justify-content-center w-100 mt-2'>{isLoading && <Spin />}</div>
            <div className="table-responsive">

                <table className="table  table-striped mt-5 w-100 mb-5">
                    <thead style={{ border: "1px solid #a9a9a9", boxShadow: " inset 3px 3px 10px 10px #a9a9a9 " }}>
                        <tr>
                            <th >S.NO</th>
                            <th >NAME</th>
                            <th >EMAIL</th>
                            <th >PASSWORD</th>
                            <th >UID</th>
                            <th >ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((user, i) => {
                            return (

                                <tr key={i}>
                                    <th >{i + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.uid}</td>
                                    <td>{user.id}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users