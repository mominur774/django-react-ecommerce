import React, { useState, useEffect } from 'react'
import {
  useStripe, useElements, PaymentElement,
  CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import useApiHelper from '../../api';

const CheckoutForm = (props) => {

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { addToast } = useToasts();
  const router = useRouter();
  const api = useApiHelper();

  const [formData, setFormData] = useState({});
  const [amount, setAmount] = useState();

  const stripe = useStripe();
  const elements = useElements();


  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        lineHeight: "27px",
        color: "#212529",
        fontSize: "1.1rem",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // const cardElement = elements.getElement(CardNumberElement)


  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: formData
    });
    if (!paymentMethodReq.error) {
      const { error } = await stripe.confirmCardPayment(props.clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });
      if (!error) {
        api.setPaymentStatus({ 'idempotency_key': props.id }).then(res => {
          setLoading(false);
          addToast('Payment succeeded!', { 'appearance': 'success' })
          router.push('/')
        }).catch(error => {
          addToast('Invalid payment information', { 'appearance': 'error' })
        })
      }
    }
  }

  useEffect(() => {
    setAmount(props.amount)
  }, [props.id])

  return (

    <div className="ptb-80">
      <div className="container">
        <div>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted mb-3">Credit Card Information</span>
            </h4>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="cc-name">Name on card *</label>
                <input
                  id="cc-name"
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="As shown on the card"
                  onChange={handleChange}
                // required
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="cc-email">Email *</label>
                <input
                  id="cc-email"
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                // required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Card Number *</label>
                <CardNumberElement
                  id="cc-number"
                  className="form-control"
                  options={CARD_ELEMENT_OPTIONS}
                />
              </div>
              {/* <div className="col-md-6 mb-3">
                    <img style={{width: '200px', marginTop: '30px'}} src="/images/payment-image/payment.png" />
                  </div> */}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="expiry">Expiration Date *</label>
                <CardExpiryElement
                  id="expiry"
                  className="form-control"
                  options={CARD_ELEMENT_OPTIONS}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cvc">CVC *</label>
                <CardCvcElement
                  id="cvc"
                  className="form-control"
                  options={CARD_ELEMENT_OPTIONS}
                />
              </div>
            </div>

            <hr className="mb-4" />
            <button className="btn btn-primary w-25" type="submit" disabled={loading}>
              {loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY $${amount ? amount : props.amount}`}
            </button>
            {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}

          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm;