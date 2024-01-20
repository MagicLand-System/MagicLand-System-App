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