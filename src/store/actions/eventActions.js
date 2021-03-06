import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "../../config/firebaseConfig";
import { toastr } from "react-redux-toastr";

firebase.initializeApp(firebaseConfig);

export const createEvent = (event) => {
  return async (dispatch) => {
    const hostUser = event.hostUserId;

    await firebase
      .firestore()
      .collection("events")
      .add(event)
      .then((docRef) => {
        firebase
          .firestore()
          .doc(`user/${hostUser}`)
          .update({
            hostEvent: firebase.firestore.FieldValue.arrayUnion(docRef.id),
          });
      })
      .then(dispatch({ type: "CREATE_EVENT", event }))
      .then(toastr.success("Success", "Event Created !"))
      .catch((err) => console.log(err));
  };
};

export const getEvents = (data) => {
  return {
    type: "GET_EVENTS",
    events: data,
  };
};

// export const initEvents = () => {
//   return (dispatch) => {
//     firebase
//       .firestore()
//       .collection("events")
//       .onSnapshot((snapshot) => {
//         let events_arr = [];
//         snapshot.docs.forEach((doc) => {
//           let event = doc.data();
//           event["id"] = doc.id;
//           events_arr.push(event);
//         });

//         let events = { ...[...events_arr] };
//         dispatch(getEvents(events));
//       });
//   };
// };
export const initEvents = (lastEvent) => {
  return async (dispatch) => {
    let eventsRef = firebase.firestore().collection("events");
    try {
      let startAfter = lastEvent && (await eventsRef.doc(lastEvent.id).get());
      let query;
      lastEvent
        ? (query = eventsRef.startAfter(startAfter).limit(3))
        : (query = eventsRef.limit(3));

      let querySnap = await query.get();
      if (querySnap.docs.length < 1) {
        return querySnap;
      }
      let events_arr = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
        let evnt = querySnap.docs[i].data();
        evnt["id"] = querySnap.docs[i].id;
        events_arr.push(evnt);
      }
      dispatch(getEvents({ ...[...events_arr] }));
      return querySnap;
    } catch (error) {
      console.error(error);
    }
  };
};
export const joinEventClick = () => {
  return {
    type: "JOIN_EVENT_CLICK",
  };
};

export const joinEventClickStart = () => {
  return {
    type: "JOIN_EVENT_CLICK_START",
  };
};
export const joinEventClickFinish = () => {
  return {
    type: "JOIN_EVENT_CLICK_FINISH",
  };
};

export const joinEvent = (eventId, userId) => {
  return async (dispatch) => {
    try {
      dispatch(joinEventClickStart());

      await firebase
        .firestore()
        .collection("events")
        .doc(eventId)
        .update({ attendee: firebase.firestore.FieldValue.arrayUnion(userId) });
      await firebase
        .firestore()
        .collection("user")
        .doc(userId)
        .update({
          joinEvent: firebase.firestore.FieldValue.arrayUnion(eventId),
        });

      toastr.success("Great!!!", "You joined the Event");

      dispatch(joinEventClickFinish());
    } catch (error) {
      console.log(error);
    }
  };
};

export const cancelJoin = () => {
  return {
    type: "CANCEL_JOIN",
  };
};

export const onCancelClick = (eventId, userId) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("events")
      .doc(eventId)
      .update({ attendee: firebase.firestore.FieldValue.arrayRemove(userId) })
      .then(
        firebase
          .firestore()
          .collection("user")
          .doc(userId)
          .update({
            joinEvent: firebase.firestore.FieldValue.arrayRemove(eventId),
          })
      )
      .then(toastr.success("Okay", "Just Canceled to Join the Event!"))
      .then(dispatch(cancelJoin()))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getAttendeeToStore = (attendee) => {
  return {
    type: "GET_ATTENDEE_TO_STORE",
    attendee: attendee,
  };
};

export const getAttendee = (attendeeId) => {
  return async (dispatch) => {
    try {
      let attendee;
      await firebase
        .firestore()
        .collection("user")
        .doc(attendeeId)
        .get()
        .then((res) => {
          attendee = res.data();
        });
      console.log(attendee);
      dispatch(getAttendeeToStore(attendee));
    } catch (err) {
      console.log(err);
    }
  };
};

export const passEventToReducer = (event) => {
  return {
    type: "UPDATE_EVENT",
    event: event,
  };
};

export const getEventDetail = (id) => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .doc(`events/${id}`)
        .get()
        .then((res) => {
          res.data();
          dispatch(passEventToReducer(res.data()));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const updateEventToDB = (id, event) => {
  return async (dispatch) => {
    await firebase
      .firestore()
      .doc(`events/${id}`)
      .update(event)
      .then(toastr.success("success", "even updated"))
      .then(dispatch(passEventToReducer(event)))
      .catch((err) => {
        console.warn(err);
      });
  };
};
