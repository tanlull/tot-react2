// Reducer

const initState = {
   // profile : null
   profile:{
       id:1,
        name : 'Tanya',
        email: 'tan@tot.co.th',
        role:'member',
   }
}

const authReducer  = (state = initState,action ) => {
    return state;
}

export default authReducer;


