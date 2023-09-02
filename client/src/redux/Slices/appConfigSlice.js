
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk('api/posts',async ()=>{
    try {
        const response = await fetch(process.env.REACT_APP_POST_URL);
        const data= await response.json();

        return data;
    } catch (e) {
        console.log(e.message);
    }
});
export const fetchComment = createAsyncThunk('api/comments',async ()=>{

    try {
        const response = await fetch(process.env.REACT_APP_COMMENT_URL);
        const data= await response.json();
        return data;
    } catch (e) {
        console.log(e.message);
    }

});

const appConfigSlice = createSlice({
    name: "appConfigSlice",
    initialState: {
        isLoading: false,
        myProfile:{},
        toastData:{},
        posts:[],
        comments:[],
        loading:false
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        showToast:(state,action)=>{
            state.toastData=action.payload;
        },
        setLoader:(state,action)=>{
            state.loading=action.payload;
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.posts=action.payload;
        })
        .addCase(fetchComment.fulfilled,(state,action)=>{
            state.comments=action.payload;
        })
    }
});




export default appConfigSlice.reducer;

export const { setLoading ,showToast,setLoader} = appConfigSlice.actions;
