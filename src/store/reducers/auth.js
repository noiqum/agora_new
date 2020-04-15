const initialstate={
    user:{
        uid:'',
        displayName:'',
        email:'',
        people:[],
        events:[]
    },
    login:false,
    signup:false,
    error:null,
    loginForm:false
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
                login:true,
                error:null
                }
        case 'LOGOUT':
            return{
                ...state,
                login:false
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                login:false,
                error:action.error
            };
        case 'SIGNUP_CLICK':
            return{
                ...state,
               
                signup:true
            };
        case 'LOGIN':
            return{
                ...state,
                signup:false,
                loginForm:true
            }
        default:
            return state;
    }


    
};


export default authReducer;