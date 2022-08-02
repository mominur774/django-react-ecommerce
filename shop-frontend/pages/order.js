import React, { useState, useEffect } from 'react';
import useApiHelper from '../api';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const api = useApiHelper();

    const getOrderList = () => {
        api.orderList().then(res => {
            setOrderList(res.results)
        }).catch(error => {
            console.log(error)
        })
    }

    const cancelOrder = (id, idempotency_key) => {
        const data = {
            'order_status': 'Cancelled',
        }
        api.cancelOrder(id, data).then(res => {
            // getOrderList();
            api.refundPaymentIntent({ 'idempotency_key': idempotency_key }).then(res => {
                getOrderList();
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    const deleteOrder = id => {
        api.deleteOrder(id).then(res => {
            getOrderList();
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getOrderList();
    }, [])

    return (
        <div className="row">
            <h4 className="text-center mb-5">Order List</h4>
            <div className="col-lg-10 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Quentity</th>
                            <th>Amount</th>
                            <th>Order Status</th>
                            <th>Cancel</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map(order => {
                            return (<React.Fragment key={order.id}>
                                <tr>
                                    <td>{order?.id}</td>
                                    <td>{order?.carts?.products?.name}</td>
                                    <td>{order?.carts?.quentity}</td>
                                    <td>{order?.carts?.total_price}</td>
                                    <td className={`status-${order?.order_status?.toLowerCase()}`}>{order?.order_status}</td>
                                    <td>
                                        {(order?.order_status === 'Processing' || order?.order_status === 'Ordered') ? (
                                            <span className="text-danger">Can't cancel</span>
                                        ) : (
                                            <Link href="#"><a onClick={() => cancelOrder(order.id, order.idempotency_key)}>Cancel</a></Link>
                                        )}
                                    </td>
                                    <td>
                                        <a className="btn btn-danger btn-sm" onClick={() => deleteOrder(order.id)} href="#"><FaTrash /></a>
                                    </td>
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
