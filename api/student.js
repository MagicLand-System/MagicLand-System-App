import api from './api'
export const addStudent = async (credential) => {
    const response = await api.post("/api/v1/students/add", credential);
    return response.data;
};
export const getStudents = async () => {
    const response = await api.get("/api/v1/students/currentuser");
    return response.data;
};

export const updateStudent = async ({ student, fullName, dateOfBirth, gender, avatarImage, email }) => {

    const data = {
        fullName: fullName ? fullName : student?.fullName,
        dateOfBirth: dateOfBirth ? dateOfBirth : student?.dateOfBirth,
        gender: gender ? gender : student?.gender,
        avatarImage: avatarImage ? avatarImage : student?.avatarImage,
        email: email ? email : student?.email,
    }

    try {
        const response = await api.put(`/api/v1/students/update`, data);
        return response;
    } catch (error) {
        console.log("updateStudent in api/student.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await api.delete(`/api/v1/students/${id}/delete`);
        return response;
    } catch (error) {
        console.log("deleteStudent in api/student.js error : " + error + ", data : " + error?.response?.data);
        return error;
    }
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

