const initialstate={
    user:{
        uid:'',
        displayName:'',
        email:'',
        people:[],
        events:[]
    },
    login:false,
    signup:false

};


const authReducer =(state=initialstate,action)=>{

    switch (action.type) {
        
          

        case 'LOGIN_SUCCESS':
            return{
                ...state,
                user:{
                    ...state.user,
                    [action.user]:action.user
                },
                login:true
                
            }
        case 'LOGOUT':
            return{
                ...state,
                login:false
            }
        default:
            return state;
    }


    
};


export default authReducer;