import { useSelector } from 'react-redux';
import { userSelector } from '../store/selector';
import api from './api'

const user = useSelector(userSelector);

export const getCurrentUser = async () => {
    const response = await api.get("/api/v1/users/getCurrentUser");
    return response.data;
};

export const updateUserData = async ({ fullName, dateOfBirth, gender, avatarImage, email, address }) => {

    const data = {
        fullName: fullName ? fullName : user?.fullName,
        dateOfBirth: dateOfBirth ? dateOfBirth : user?.dateOfBirth,
        gender: gender ? gender : user?.gender,
        avatarImage: avatarImage ? avatarImage : user?.avatarImage,
        email: email ? email : user?.email,
        address: address ? address : user?.address
    }
    
    try {
        const response = await api.put("/api/v1/users/update");
        return response;
    } catch (error) {
        console.log("updateUserData in api/user.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};