let initialState = {
  events: [
    {
      id: null,
      title: "learn flutter",
      category: "education",
      date: "01-02-2020",
      address: "red house corner 55/8 street ",
      description: "learning flutter by peer coorperation",
      attendee: [],
      hostName: "flutter hamdi",
    },
  ],
  joinProcess: false,
  joinProcessStart: false,
  joinProcessFinish: false,
  attendee: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      return {
        ...state,
        events: state.events.concat(action.event),
      };
    case "GET_EVENTS":
      return {
        ...state,
        events: Object.values(action.events),
      };
    case "JOIN_EVENT_CLICK":
      return {
        ...state,
        joinProcess: true,
      };

    case "CANCEL_JOIN":
      return {
        ...state,
      };
    case "JOIN_EVENT_CLICK_START":
      return {
        ...state,
        joinProcessStart: true,
      };
    case "JOIN_EVENT_CLICK_FINISH":
      return {
        ...state,
        joinProcessStart: false,
        joinProcessFinish: true,
      };
    case "GET_ATTENDEE_TO_STORE":
      return {
        ...state,
        attendee: action.attendee,
      };
    default:
      return state;
  }
};

export default eventReducer;
