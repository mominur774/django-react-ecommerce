import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useApiHelper from '../../api';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const [carts, setCarts] = useState([]);
    const api = useApiHelper();

    const cartList = () => {
        api.getCartList().then(res => {
            setCarts(res.results)
        }).catch(error => {
            console.log(error)
        })
    }

    const deleteCartItem = (id) => {
        api.deleteCart(id).then(res => {
            cartList()
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        cartList();
    }, [])

    return (
        <div className="row">
            <h4 className="text-center mb-5">Cart List</h4>
            <div className="col-lg-10 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Quentity</th>
                            <th>Amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map(cart => {
                            return (<React.Fragment key={cart.id}>
                                <tr>
                                    <td>{cart?.id}</td>
                                    <td>
                                        <Link href={`/cart/${cart.id}`}>{cart?.products?.name}</Link>
                                    </td>
                                    <td>
                                        <img width="50" src={cart?.products?.product_image} alt="" />
                                    </td>
                                    <td>{cart?.quentity}</td>
                                    <td>{cart?.total_price}</td>
                                    <td>
                                        <a className="btn btn-danger btn-sm" onClick={() => deleteCartItem(cart.id)} href="#"><FaTrash /></a>
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

export default Cart
