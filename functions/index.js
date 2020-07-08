const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const saveNotification = async (notification) => {
  let participation =
    notification.m.attendee.length > notification.mb.attendee.length
      ? true
      : false;
  let eventHost = notification.m.hostUserId;
  let eventTitle = notification.m.title;
  if (participation) {
    let addedOne = notification.m.attendee.pop();
    var attendeeDisplayname = await admin
      .firestore()
      .doc(`user/${addedOne}`)
      .get()
      .then((res) => {
        return res.data().displayName;
      });
    let note = {
      m: `${attendeeDisplayname} joins at ${eventTitle}`,
      event: true,
      people: false,
      time: Date.now(),
      peopleLink: addedOne,
    };
    let check = await admin
      .firestore()
      .doc(`notification/${addedOne}`)
      .get()
      .then((res) => res.exists);

    return check
      ? admin
          .firestore()
          .collection("notification")
          .doc(eventHost)
          .update({
            note: admin.firestore.FieldValue.arrayUnion(note),
          })
          .then(console.log("done"))
          .catch((err) => {
            console.log(err);
          })
      : admin
          .firestore()
          .collection("notification")
          .doc(eventHost)
          .set({
            note: [note],
          })
          .then(console.log("done"))
          .catch((err) => {
            console.log(err);
          });
  } else {
    return;
  }
};
exports.eventNotification = functions.firestore
  .document("events/{eventId}")
  .onWrite((change, context) => {
    const doc = change.after.data();
    const docBefore = change.before.data();
    const id = context.params.eventId;
    let notification = { m: doc, id: id, mb: docBefore };
    return saveNotification(notification);
  });
