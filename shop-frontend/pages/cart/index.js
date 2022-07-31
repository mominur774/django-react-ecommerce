import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useApiHelper from '../../api';

const Cart = () => {
    const [carts, setCarts] = useState([]);
    const api = useApiHelper();

    useEffect(() => {
        api.getCartList().then(res => {
            setCarts(res.results)
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
