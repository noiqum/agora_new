
let initialState = {
    events:[{
        id:null,
        title:'learn flutter',
        category:'education',
        date:'01.02.2020',
        address:'red house corner 55/8 street ',
        description:'learning flutter by peer coorperation',
        attendee:[],
        hostName:'flutter hamdi'
    }]
    
};

 export   const eventReducer =(state=initialState,action)=>{
    switch (action.type) {
        case 'CREATE_EVENT':
        return {
            
            ...state,
            events:state.events.concat(action.event)
            
        }
        case 'GET_EVENTS':
            return {
                ...state,
                events:state.events.concat(Object.values(action.events))
            
            }
        default:
            return state;
    }
}

export default eventReducer;

