import useInterCeptor from "./interceptors";


const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        //auth
        login: ( data, params={} ) => axios.post(`rest-auth/login/`, data, { params: params }),
        signup: ( data, params={} ) => axios.post(`rest-auth/registration/`, data, { params: params }),
        logout: ( data, params={} ) => axios.post(`rest-auth/logout/`, data, { params: params }),

        //product
        getProductList: ( params={} ) => axios.get(`product/api/v1/product-list/`, { params: params }),
        addToCart: ( data, params={} ) => axios.post(`product/api/v1/add-to-cart/`, data, { params: params }),
        getCartDetails: (id, params={} ) => axios.get(`product/api/v1/cart-details/${id}`, { params: params }),
        decreaseCartQuentity: ( data, params={} ) => axios.post(`product/api/v1/decrease/`, data, { params: params }),

        //billing
        createBilling: ( data, params={} ) => axios.post(`order/api/v1/create-billing/`, data, { params: params }),
        getBillingList: ( params={} ) => axios.get(`order/api/v1/billing-list/`, { params: params }),
        placeOrder: ( data, params={} ) => axios.post(`order/api/v1/place-order/`, data, { params: params }),

        //payment
        createPaymentIntent: ( data, params={} ) => axios.post(`payment/api/v1/create-payment-intent/`, data, { params: params }),
        retrievePaymentIntent: ( idempotency_key, params={} ) => axios.get(`payment/api/v1/retrieve-payment-intent/${idempotency_key}`, { params: params }),
        setPaymentStatus: ( data, params={} ) => axios.post(`payment/api/v1/payment-status`, data, { params: params }),
    }

    return api;
}

export default useApiHelper;