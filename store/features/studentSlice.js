import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudents } from '../../api/student';

const initialState = {
    studentList: [],
    loading: true,
    error: null,
};

export const fetchStudentList = createAsyncThunk(
    'auth/fetch_student_list',
    async (_, thunkAPI) => {
        try {
            const response = await getStudents();
            console.log("reload student List");
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const studentSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStudentList.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchStudentList.fulfilled, (state, action) => {
            state.loading = false;
            state.studentList = action.payload;
        });

        builder.addCase(fetchStudentList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export default studentSlice.reducer;
