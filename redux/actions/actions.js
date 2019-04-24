export const GET_PROFILE = 'GET_PROFILE';

export const getProfile = (profile) => {
    return {
        type : GET_PROFILE,
        payload:{
            profile : profile
        }
    }
}