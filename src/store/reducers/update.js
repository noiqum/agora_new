let initialState={
    event:{
        title:'',
        category:'',
        date:'',
        city:'',
        address:'',
        description:'',
    }
}

 const updateReducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'UPDATE_EVENT':
            
            return{
                ...state,
                event:action.event
            }
    
        default:
            return state;
    }

}

export default updateReducer;