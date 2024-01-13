import api from './api'
export const addStudent = async (credential) => {
    const response = await api.post("/api/v1/students/add", credential);
    return response.data;
};
export const getStudents = async () => {
    const response = await api.get("/api/v1/students/currentuser");
    return response.data;
};

export const getClasses = async ({ id, status }) => {
    const response = await api.get("/api/v1/students/getclass", {
        params: {
            studentId: id,
            status: status,
        }
    });
    return response.data;
};

export const getschedule = async (id) => {
    try {
        const response = await api.get("/api/v1/students/getschedule?studentId=" + id);
        return response;
    } catch (error) {
        console.log("getschedule in api/student.js error : ", error);
        return error;
    }
};

export const getClassesByStudentId = async (id) => {
    try {
        const response = await api.get("/api/v1/students/getclass?studentId=" + id);
        return response;
    } catch (error) {
        console.log("getClassesByStudentId in api/student.js error : ", error);
        return error;
    }
};

