import React, { useEffect, useState } from 'react';
import { NEXT_PUBLIC_APP_API_URL } from '../../interceptors';
import useApiHelper from '../../api';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

const CartDetails = (props) => {
    const api = useApiHelper();
    const [cartItem, setCartItem] = useState({});
    const [billing, setBilling] = useState({});
    const [billingId, setBillingId] = useState(null);
    const [billingList, setBillingList] = useState([]);
    const [isBilling, setIsBilling] = useState(false);

    const { addToast } = useToasts();
    const router = useRouter();

    const cartDetails = () =>{
        api.getCartDetails(props?.id).then(res=>{
            setCartItem(res)
        })
    }

    const increaseQuentity = (id) => {
        api.addToCart({'product': id}).then(res=>{
            cartDetails();
        }).catch(error=>{
            console.log(error)
        })
    }
    const decreaseQuentity = (id) => {
        api.decreaseCartQuentity({'product': id}).then(res=>{
            cartDetails();
        }).catch(error=>{
            console.log(error)
        })
    }

    const handleBilling = e => {
        setBilling({
            ...billing,
            [e.target.name]: e.target.value
        })   
    }

    const handleRadio = e => {
        setBillingId(e.target.value)
    }

    const getBilling = () => {
        api.getBillingList().then(res=>{
            setIsBilling(true);
            setBillingList(res.results)
        }).catch(error=>{
            console.log(error)
        })
    }

    const submitBilling = e => {
        e.preventDefault();
        api.createBilling(billing).then(res=>{
            getBilling();
        }).catch(error=> {
            console.log(error)
        })
    }

    const placeOrder = (e) => {
        const data = {
            'billing': billingId,
            'cart': cartItem.id
        }
        api.placeOrder(data).then(res=>{
            api.createPaymentIntent({'idempotency_key': res.idempotency_key}).then(response=>{
                router.push(`/checkout/pay/${res.idempotency_key}/`)
            }).catch(error=> {
                console.log(error)
            })
        }).catch(error=> {
            addToast(error.response.data.billing[0], { appearance: 'error' })
        })
    }

    useEffect(()=>{
        cartDetails();
        getBilling();
    }, [])
    
  return (
    <div className="row">
      <div className="col-12 col-lg-7 col-md-7 col-sm-12">
        <h5 className="mb-3">Add billing details</h5>
        {billingList.length>0 && isBilling ? (
            <>
            {billingList.map(billing=>{
                return(
                    <div key={billing.id}>
                        <input 
                            type="radio" 
                            name="billing"
                            onChange={handleRadio}
                            value={billing.id}
                            required
                        /> 
                        <span className="mx-2">{billing.street}, {billing.city} - {billing.zip}</span>
                    </div>
                )
            })}
            <div className="mt-4">
                <a onClick={()=> setIsBilling(false)} href="#">Add another billing</a>
            </div>
            </>
        ) : (<>
        <form onSubmit={submitBilling} action="">
            <div className="row">
                <div className="col-lg-8">
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="street">Street</label>
                        <input 
                            type="text" 
                            name="street"
                            className="form-control"
                            onChange={handleBilling}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="city">City</label>
                        <input 
                            type="text" 
                            name="city"
                            className="form-control"
                            onChange={handleBilling}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="zip">Zip code</label>
                        <input 
                            type="text" 
                            name="zip"
                            className="form-control"
                            onChange={handleBilling}
                        />
                    </div>
                </div>
            </div>
            <button className="btn btn-primary px-5 mt-3" type="submit">Add</button>
        </form>
        {billingList.length>0 && 
        <div className="mt-4">
            <a onClick={()=> setIsBilling(true)} href="#">Add existing billing</a>
        </div>
        }
        </>)}
        
      </div>
      <div className="col-12 col-lg-5 col-md-5 col-sm-12">
        <div className="d-flex justify-content-start">
            <img width="50%" height="130px" src={cartItem?.products?.product_image} alt="" />
            <div className="mx-3">
                <h6>{cartItem?.products?.name} X {cartItem?.quentity}</h6>
                <p><b>${cartItem?.total_price}</b></p>
                <div className="quentity d-flex align-items-center justify-content-between">
                    <button onClick={()=>decreaseQuentity(cartItem?.product)} className="btn btn-outline-primary btn-sm px-3">-</button>
                    <p className="m-3">{cartItem?.quentity}</p>
                    <button onClick={()=>increaseQuentity(cartItem?.product)} className="btn btn-outline-primary btn-sm px-3">+</button>
                </div>
            </div>
        </div>
        <p className="my-3">{cartItem?.products?.full_description}</p>
        <hr />
        <button onClick={placeOrder} className="btn btn-warning w-100" type="submit">Place Order</button>
      </div>
    </div>
  )
}

export default CartDetails

export async function getServerSideProps(context) {
    // var headers = {
    //     method: "GET",
    //     mode: "cors",
    //     cache: "no-cache",
    //     credentials: "same-origin",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept-Language": context.locale,
    //     },
    //     redirect: "follow",
    //     referrerPolicy: "no-referrer",
    //   };
    
    //   if (context.req.cookies.accessToken) {
    //     headers.headers["Authorization"] = "JWT " + context.req.cookies.accessToken;
    //   }
    // const res = await fetch(`${NEXT_PUBLIC_APP_API_URL}product/api/v1/cart-details/${context.params.id}/`, headers)
    // const data = await res.json()
  
    // return { props: { data } }
    return {
        props: { id: context.params.id }
    }
  }