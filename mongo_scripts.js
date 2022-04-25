db.v1_dood_messages.find().forEach(function (myDoc) {
  const cat = myDoc.category.toString();
  db.v1_dood_messages.updateOne({ _id: myDoc._id }, { $set: { category: cat } });
});
