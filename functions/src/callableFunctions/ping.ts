import * as functions from "firebase-functions";

const ping = functions.https.onCall((data, context) => {
    return "Pong";
});

export default ping;
