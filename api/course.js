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

export const getCourseByStudentId = async (id) => {
    try {
        const response = await api.get(`/api/v1/students/${id}/getcourses`);
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

export const getSyllabus = async (CouseId) => {
    try {
        const response = await api.get(`/api/v1/Syllabus/getByCourse?CouseId=${CouseId}`);
        return response;
    } catch (error) {
        console.log("getSyllabus in api/course.js error : ", error);
        return error;
    }
};


