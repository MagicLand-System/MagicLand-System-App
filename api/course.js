import api from './api'

export const getAllCourse = async () => {
    try {
        const response = await api.get("/api/v1/courses");
        return response;
    } catch (error) {
        console.log("getAllCourse in api/course.js error : ", error);
        return error;
    }
};

export const getCourseByCourseId = async () => {
    try {
        const response = await api.get(`/api/v1/${courseID}`);
        return response;
    } catch (error) {
        console.log("getCourseByCourseId in api/course.js error : ", error);
        return error;
    }
};

export const getCourseCategories = async () => {
    try {
        const response = await api.get(`/api/v1/courses/categories`);
        return response;
    } catch (error) {
        console.log("getCourseCategories in api/course.js error : ", error);
        return error;
    }
};
