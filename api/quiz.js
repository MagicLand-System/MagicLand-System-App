import api from './api'

export const getQuizByCourseid = async (id) => {
    try {
        const response = await api.get(`/api/v1/exams/quizzes/course?id=${id}`);
        return response;
    } catch (error) {
        console.log("getQuizByCourseid in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const getQuizByClassid = async (id) => {
    try {
        const response = await api.get(`/api/v1/exams/class?id=${id}`);
        return response;
    } catch (error) {
        console.log("getQuizByClassid in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const getQuizById = async (id) => {
    try {
        const response = await api.get(`/api/v1/exam/quiz?id=${id}`);
        return response;
    } catch (error) {
        console.log("getQuizById in api/quiz.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};
