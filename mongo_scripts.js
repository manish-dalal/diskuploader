db.v1_dood_messages.find().forEach(function (myDoc) {
  const cat = myDoc.category.toString();
  db.v1_dood_messages.updateOne({ _id: myDoc._id }, { $set: { category: cat } });
});

// { text:  { $regex: /Raid/, $options: 'i' }},
// 2022-04-30T06:40:10.321+00:00

var count = 1
db.tasks.find({ botToken : "5353424234:AAGn1_NDS_58BXXpAqnc85QmNkgnT6vUvwc" }).forEach(function (myDoc) {
  const cat = myDoc.category.toString();
  db.tasks.updateOne({ _id: myDoc._id }, { $set: { botToken: "5311112853:AAGoEkdFls2ZZ0pPYuUDmCrWgpcGynlITHM" } });
  console.log("index", count)
  count++
});

// { category: "4", imgDriveId: { $nin: ['', null] }, cloudinaryUrl: { $in: ['', null] } }

// { url: { $regex: new RegExp('324GCn', 'i') }}

// { created: { $lte: ISODate("2022-05-13T17:39:02.109+00:00")}}
// 2022-05-13T17:29:44.468+00:00

var count = 1
db.v1_mdisk_messages.find({ category: '6', imgDriveId: { $in: ['', null] } }).forEach(function (myDoc) {
  const cat = myDoc.category.toString()
  db.v1_mdisk_messages.updateOne(
    { _id: myDoc._id },
    {
      $set: {
        imgDriveId: '1Xy9NTa1eUNQwjfNNl9esmwggOFwEG-qx',
        cloudinaryUrl: 'https://res.cloudinary.com/mdiskapp/image/upload/v1653822398/mdisk1/ein4jrdrd3hnqy44yjbr.jpg'
      }
    }
  )
  console.log('index', count)
  count++
})

db.v1_mdisk_messages.deleteMany({ text: "" })

var count = 1
db.v1_mdisk_messages.find({ category: '6' }).forEach(function (myDoc) {
  if (myDoc.text.length >= 1024) console.log('index', count, "_id", myDoc._id)
  count++
})

// update tasks page size
var count = 1
db.tasks.find({ linkType: 'mdisk' }).forEach(function (myDoc) {
  const pageSize = parseInt(myDoc.size) > 20 ? 20: parseInt(myDoc.size)
  db.tasks.updateOne(
    { _id: myDoc._id },
    {
      $set: {
        size: pageSize.toString(),
        }
    }
  )
  console.log('index', count)
  count++
})