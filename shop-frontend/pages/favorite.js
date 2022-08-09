import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useApiHelper from '../api';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const api = useApiHelper();

    const favoriteList = () => {
        api.getFavoriteList().then(res => {
            setFavorites(res.results)
        }).catch(error => {
            console.log(error)
        })
    }


    const deleteFavoriteItem = (id) => {
        api.deleteFavorite(id).then(res => {
            favoriteList()
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        favoriteList();
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
                            <th>Amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map(favorite => {
                            return (<React.Fragment key={favorite.id}>
                                <tr>
                                    <td>{favorite?.id}</td>
                                    <td>
                                        <Link href="#">{favorite?.products?.name}</Link>
                                    </td>
                                    <td>
                                        <img width="50" src={favorite?.products?.product_image} alt="" />
                                    </td>
                                    <td>{favorite?.products?.price}</td>
                                    <td>
                                        <a className="btn btn-danger btn-sm" onClick={() => deleteFavoriteItem(favorite.id)} href="#"><FaTrash /></a>
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

export default Favorite
