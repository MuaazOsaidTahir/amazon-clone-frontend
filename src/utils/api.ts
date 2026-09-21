import axiosFetch from "./axios"


export const fetchCategories = async () => {
    try {
        const response = await axiosFetch.get(`/products/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

export const fetchProducts = async (category: string, limit: number, body: any = {}) => {
    try {
        const response = await axiosFetch.post(`/products/${category}${limit ? `?limit=${limit}` : ''}`, body);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export const fetchProductById = async (id: string) => {
    try {
        const response = await axiosFetch.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
    }
}

export const fetchProductsBySearch = async (query: string, limit: number, category: string) => {
    try {
        const response = await axiosFetch.get(`/products/search?query=${query}${limit ? `&limit=${limit}` : ''}&category=${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products by search:", error);
    }
}

export const logInUser = async (body: any) => {
    try {
        const response = await axiosFetch.post("/user/login", body)
        return response.data
    } catch (error: any) {
        console.error("Error while logging in user: ", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong while logging in.",
            error,
        }
    }
}

export const createUser = async (body: any) => {
    try {
        const response = await axiosFetch.post("/user/register", body)
        return response.data
    } catch (error: any) {
        console.error("Error while logging in user: ", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong while logging in.",
            error,
        }
    }
}

export const checkoutProductsBilling = async (body: any) => {
    try {
        console.log(body);
        // return
        const response = await axiosFetch.post("/checkout/create-checkout-session", body);
        window.location.href = response?.data?.url
        // return response.data
    } catch (error: any) {
        console.error("Error while logging in user: ", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong while logging in.",
            error,
        }
    }
}

export const checkUserStatus = async () => {
    try {
        const response = await axiosFetch.get("/user/logged-in-user");
        return response.data
    } catch (error: any) {
        console.error("Error while logging in user: ", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong while logging in.",
            error,
        }
    }
}

export const fetchUserOrders = async (category: string) => {
    try {
        const response = await axiosFetch.get(`/user/orders?category=${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return { orders: [] };
    }
}

export const initiateReturns = async (id: string) => {
    try {
        const response = await axiosFetch.get(`/checkout/order-return?id=${id}`)
        return response.data
    } catch (error: any) {
        console.error("Error initiateReturns: ", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong initiate returning.",
            error,
        }
    }
}

export const getUserLocation = async () => {
    try {
        const response = await axiosFetch.get("/user/current-location")
        return response.data
    } catch (error: any) {
        console.error("Error getUserLocation: ", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong getting location.",
            error,
        }
    }
}