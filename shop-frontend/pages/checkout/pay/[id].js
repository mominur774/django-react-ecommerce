import React, { useEffect, useState } from 'react';
import useApiHelper from '../../../api';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../../components/PaymentForm/CheckoutForm';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const Checkout = (props) => {
    const [clientSecret, setClientSecret] = useState();
    const [amount, setAmount] = useState();

    const api = useApiHelper();

    if(clientSecret){
        var options = {
          // passing the client secret obtained from the server
            clientSecret: `${clientSecret}`
        };
      }

    useEffect(() =>{
        api.retrievePaymentIntent(props.id).then(res=>{
            setClientSecret(res.stripe_response.client_secret)
            setAmount(res.stripe_response.amount)
        }).catch(error=>{
            console.log(error)
        })
    }, [])
  return (
    <Elements stripe={stripePromise} options={options}>
        <CheckoutForm clientSecret={clientSecret} amount={amount} id={props.id} />
    </Elements>
  )
}

export default Checkout

export async function getServerSideProps(context) {
    return {
      props: { id: context.params.id }
    }
  }