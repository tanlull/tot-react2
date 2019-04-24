export const GET_PROFILE = 'GET_PROFILE';

// const profile ={
//     id:1,
//     name : 'Tanya',
//     email: 'tan@tot.co.th',
//     role:'member',
// }

export const getProfile = (profile) => {
    return {
        type : GET_PROFILE,
        payload:{
            profile : profile
        }
    }
}