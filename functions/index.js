const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addTrainer = functions.https.onRequest(async (req, res) => {
    const trainer_name = req.query.text;
    const writeResult = await admin.firestore().collection('trainers').add({trainer_name: trainer_name});
    res.json({trainer_status: `Trainer ${trainer_name} with ID: ${writeResult.id} added to Sanketana!`});
  });


exports.getTrainerDate = functions.firestore.document('/trainers/{documentId}')
.onCreate((snap, context) => {
  const trainer_name = snap.data().trainer_name;
  functions.logger.log('Calculating Date', context.params.documentId, trainer_name);
  
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  return snap.ref.set({date}, {merge: true});
});
