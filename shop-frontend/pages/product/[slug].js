import React, { useState } from 'react';
import useApiHelper from '../../api';
import { NEXT_PUBLIC_APP_API_URL } from '../../interceptors';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

const ProductDetails = (props) => {
  const api = useApiHelper();
  const router = useRouter();
  const { addToast } = useToasts();

  const addToCart = (id) => {
    api.addToCart({ 'product': id }).then(res => {
      router.push(`/cart/${res.id}/`)
    }).catch(error => {
      addToast(error.response.data.detail, { 'appearance': 'error' })
    })
  }
  return (
    <div className="row">
      <div className="col-12 col-lg-7 col-md-7 col-sm-12">
        <img width="100%" height="400px" src={props.data.product_image} alt="" />
      </div>
      <div className="col-12 col-lg-5 col-md-5 col-sm-12">
        <h2 className="mb-3">{props.data.name}</h2>
        <h4 className="mb-3">${props.data.price}</h4>
        <div className="d-flex">
          <button onClick={() => addToCart(props.data.id)} className="btn btn-outline-primary me-2">Add to cart</button>
          <button className="btn btn-outline-success me-2">Buy now</button>
        </div>
        <hr />
        <p>{props.data.full_description}</p>
      </div>
    </div>
  )
}

export default ProductDetails;

export async function getServerSideProps(context) {
  const res = await fetch(`${NEXT_PUBLIC_APP_API_URL}product/api/v1/product-details/${context.params.slug}/`)
  const data = await res.json()

  return { props: { data } }
}
