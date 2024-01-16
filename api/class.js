import api from './api'

export const getAllClass = async () => {
    try {
        const response = await api.get("/api/v1/classes");
        return response;
    } catch (error) {
        console.log("getAllClass in api/course.js error : ", error);
        return error;
    }
};

export const getClassByClassId = async (classID) => {
    try {
        const response = await api.get(`/api/v1/classes/${classID}`);
        return response;
    } catch (error) {
        console.log("getClassByClassId in api/class.js error : ", error);
        return error;
    }
};

export const getClassByCourseId = async (courseID) => {
    try {
        const response = await api.get(`/api/v1/classes/course/${courseID}`);
        return response;
    } catch (error) {
        console.log("getClassByCourseId in api/class.js error : ", error);
        return error;
    }
};

export const registerClass = async (studentsIdList, classId) => {

    const data = {
        studentsIdList: studentsIdList,
        classId: classId
    }

    try {
        const response = await api.post(`/api/v1/users/checkout`, data);
        return response;
    } catch (error) {
        console.log("registerClass in api/class.js error : ", error);
        return error;
    }
};

