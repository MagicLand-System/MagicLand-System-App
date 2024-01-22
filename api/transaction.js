import api from './api'
export const getWalletTransactions = async (phone) => {
    try {
        const response = await api.get("/api/v1/walletTransactions?phone=" + phone);
        return response;
    } catch (error) {
        console.log("getWalletTransactions in api/transaction.js error : ", error);
        return error;
    }
};

export const getWalletBalance = async () => {
    try {
        const response = await api.get("/api/v1/walletTransactions/walletBalance");
        return response;
    } catch (error) {
        console.log("getWalletBalance in api/transaction.js error : ", error);
        return error;
    }
};
