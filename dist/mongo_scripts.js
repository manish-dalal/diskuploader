"use strict";

db.v1_dood_messages.find().forEach(function (myDoc) {
  const cat = myDoc.category.toString();
  db.v1_dood_messages.updateOne({
    _id: myDoc._id
  }, {
    $set: {
      category: cat
    }
  });
}); // { text:  { $regex: /Raid/, $options: 'i' }},
// 2022-04-30T06:40:10.321+00:00

var count = 1;
db.tasks.find({
  botToken: "5353424234:AAGn1_NDS_58BXXpAqnc85QmNkgnT6vUvwc"
}).forEach(function (myDoc) {
  const cat = myDoc.category.toString();
  db.tasks.updateOne({
    _id: myDoc._id
  }, {
    $set: {
      botToken: "5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM"
    }
  });
  console.log("index", count);
  count++;
}); // { category: "4", imgDriveId: { $nin: ['', null] }, cloudinaryUrl: { $in: ['', null] } }