db.v1_dood_messages.find().forEach(function (myDoc) {
  const cat = myDoc.category.toString();
  db.v1_dood_messages.updateOne({ _id: myDoc._id }, { $set: { category: cat } });
});

// { text:  { $regex: /Raid/, $options: 'i' }},
// 2022-04-30T06:40:10.321+00:00