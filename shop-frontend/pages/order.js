import React, { useState, useEffect } from 'react';
import useApiHelper from '../api';

const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const api = useApiHelper();

    useEffect(() => {
        api.orderList().then(res => {
            setOrderList(res.results)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <div className="row">
            <div className="col-lg-10 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Quentity</th>
                            <th>Amount</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map(order => {
                            return (<React.Fragment key={order.id}>
                                <tr>
                                    <td>{order?.id}</td>
                                    <td>{order?.carts?.products?.name}</td>
                                    <td>
                                        <img width="50" src={order?.carts?.products?.product_image} alt="" />
                                    </td>
                                    <td>{order?.carts?.quentity}</td>
                                    <td>{order?.carts?.total_price}</td>
                                    <td className={`status-${order?.order_status?.toLowerCase()}`}>{order?.order_status}</td>
                                </tr>
                            </React.Fragment>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order
