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
    loginForm:false,
    signupProcess:false,
    signupError:null
};


const authReducer =(state=initialstate,action)=>{

    switch (action.type) {
        
          case 'LOGIN_SUCCESS':
            return{
                ...state,
                user:action.user,
                login:true,
                error:null
                }
        case 'LOGOUT':
            return{
                ...state,
                login:false,
                signup:false
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

        case 'SIGNUP_FORM_CLICK':
            return{
                ...state,
            
            }
        case 'SIGNUP_SUCCESS':
            return{
                ...state,
                signupProcess:true
            }
        case 'SIGNUP_FAILED':
            return{
                ...state,
                signupProcess:false,
                signupError:action.error
            }
        case 'ERROR_MSG_CLOSE':
            return{
                ...state,
                signupError:null,
                error:null
            }
        case '  UPDATE_DISPLAYNAME':
            return {
                ...state,
                user:{
                    ...state.user,
                    displayName:action.newName
                }
                
            }

        default:
            return state;
    }


    
};


export default authReducer;