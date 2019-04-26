import axios from 'axios';
//Profile
export const GET_PROFILE = 'GET_PROFILE';
export const getProfile = (profile) => {
    return {
        type: GET_PROFILE,
        payload: {
            profile: profile
        }
    }
};

//Category
export const ADD_CAT = 'ADD_CAT';
export const DEL_CAT = 'DEL_CAT';
export const EDIT_CAT = 'EDIT_CAT';
export const GET_CAT = 'GET_CAT';
export const LOADING = 'LOADING';
export const GET_ERROR = 'GET_ERROR';

//insert
export const addCat = (name) => {
    return async (dispatch) => {
        const response = await axios.post('https://api.codingthailand.com/api/category',
        {
            name: name
        });
        dispatch(getCat());
        alert(response.data.message);
    }
}

//delete
export const delCat = (id) => {
    return async (dispatch) => {
        const response = await axios.delete('https://api.codingthailand.com/api/category/'+id);
        dispatch(getCat());
        alert(response.data.message);
    }
}

//edit
export const editCat = (id, name) => {
    return async (dispatch) => {
        const response = await axios.put('https://api.codingthailand.com/api/category',
        {
            id: id,
            name: name
        });
        dispatch(getCat());
        alert(response.data.message);
    }
}



export const getCat = () => {

    return async (dispatch) => {

        //loading true
        dispatch({ type: LOADING, loading: true });

        try {
            const response = await axios.get('https://api.codingthailand.com/api/category');
            dispatch({
                type: GET_CAT,
                payload: {
                    category: response.data
                }
            });
            dispatch({ type: LOADING, loading: false });
        } catch (error) {
            dispatch({ type: LOADING, loading: false });

            dispatch({ type: GET_ERROR, errorMessage: 'เกิดข้อผิดพลาดที่ Server' });
            //dispatch({ type: GET_ERROR, errorMessage: error.response.data.message });
            //alert(JSON.stringify(error));
        }

       

    }
}

