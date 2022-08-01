import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import useApiHelper from '../../api';

const Product = () => {
  const [products, setProducts] = useState([]);
  const api = useApiHelper();

  useEffect(() => {
    api.getProductList().then(res => {
      setProducts(res.results);
    }).catch(error => {
      console.log(error)
    })
  }, [])


  return (
    <div className="my-3">
      <div className="row">
        {products.length && products.map(product => {
          return (<React.Fragment key={product.id}>
            <Link href={`/product/${product.slug}/`}>
              <div style={{ 'cursor': 'pointer' }} className="product col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 p-3 my-3">
                <img width="100%" height="200px" src={product.product_image} alt="product" />
                <h5 className="mt-3">{product.name}</h5>
                <h4 className="mt-1">${product.price}</h4>
                <hr />
                <p>{product.short_description}</p>
              </div>
            </Link>
          </React.Fragment>)
        })}
      </div>
    </div>
  )
}

export default Product
