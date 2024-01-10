import api from './api'

export const getCartOfParent = async () => {
    try {
        const response = await api.get("/api/v1/cart/view");
        return response;
    } catch (error) {
        console.log("getCartOfParent in api/cart.js error : ", error);
        return error;
    }
};

export const modifyCart = async (studentIds, classId) => {

    const data = {
        studentIds: studentIds,
        classId: classId
    }

    try {
        const response = await api.post("/api/v1/cart/modify", data);
        return response;
    } catch (error) {
        console.log("modifyCart in api/cart.js error : ", error);
        return error;
    }
};

export const removeClassInCart = async (itemId) => {
    try {
        const response = await api.delete(`/api/v1/cart/item/${itemId}/delete`);
        return response;
    } catch (error) {
        console.log("removeClassInCart in api/cart.js error : ", error);
        return error;
    }
};
