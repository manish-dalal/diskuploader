"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _message = require("./message.model");

var _getCloudinarySignature = require("../../utils/getCloudinarySignature");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messages = {};
exports.messages = messages;

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

messages.index = async (req, res) => {
  try {
    const {
      imgDriveId = '',
      text = '',
      category = '',
      cname = 'v1',
      linkType = 'mdisk',
      pageSize = '100',
      page = '0'
    } = req.query;
    const params = {};

    if (category) {
      params.category = category;
    }

    if (imgDriveId) {
      params.imgDriveId = imgDriveId;
    }

    if (text) {
      params.text = {
        $regex: new RegExp(text, 'i')
      };
    }

    let collectionName = `${cname}_${linkType}_messages`;
    const messageModel = (0, _message.getModel)(collectionName);
    const totalMessages = await messageModel.countDocuments(params);
    const parsedPage = parseInt(page);
    const parsedPagesize = parseInt(pageSize);
    const skipDoc = parsedPagesize * parsedPage;
    const messagesArr = await messageModel.find(params, {
      imgDriveId: 1,
      text: 1,
      category: 1,
      cloudinaryUrl: 1
    }).skip(skipDoc).limit(parsedPagesize);
    return res.json({
      totalpages: JSON.stringify(Math.ceil(totalMessages / parsedPagesize)),
      messages: messagesArr
    });
  } catch (error) {
    console.log('error', error);
    return {
      error: error.toString()
    };
  }
};

messages.updateCloudinary = async (req, res) => {
  try {
    const {
      category = '',
      cname = 'v1',
      linkType = 'mdisk',
      pageSize = '40'
    } = req.query;
    const params = {
      imgDriveId: {
        $nin: ['', null]
      },
      cloudinaryUrl: {
        $in: ['', null]
      }
    };

    if (category) {
      params.category = category;
    }

    let collectionName = `${cname}_${linkType}_messages`;
    const messageModel = (0, _message.getModel)(collectionName);
    const parsedPagesize = parseInt(pageSize);
    const messagesArr = await messageModel.find(params, {
      imgDriveId: 1,
      _id: 1,
      cloudinaryUrl: 1
    }).limit(parsedPagesize);

    for (const myDoc of messagesArr || []) {
      const sigData = (0, _getCloudinarySignature.getCloudinarySignature)(`${linkType}1`);

      if (myDoc.imgDriveId && sigData.apikey) {
        try {
          await sleep(1000);
          const formData = new URLSearchParams(); // `https://drive.google.com/uc?export=view&id=${myDoc.imgDriveId}`

          const mdiskUrl = `https://mdiskdoodbot.herokuapp.com/api/v1/drive/file/temp.jpg?id=${myDoc.imgDriveId}`;
          formData.append('file', mdiskUrl);
          formData.append('api_key', sigData.apikey);
          formData.append('timestamp', sigData.timestamp);
          formData.append('signature', sigData.signature);
          formData.append('folder', sigData.folder);
          const url = 'https://api.cloudinary.com/v1_1/' + sigData.cloudname + '/auto/upload';
          const {
            data = {}
          } = await _axios.default.post(url, formData);
          console.log(`${messagesArr.indexOf(myDoc) + 1} data`, JSON.stringify(data));
          const cloudinaryUrl = data.secure_url;
          await messageModel.findOneAndUpdate({
            _id: myDoc._id
          }, {
            $set: {
              cloudinaryUrl
            }
          });
          myDoc.cloudinaryUrl = data.secure_url;
        } catch (error1) {
          console.log('myDoc', myDoc._id);
          console.log('error1', error1);
          console.log('error1 message', error1.message);
          console.log('error1 data', error1.data);
          console.log('error1 response', error1.response);
        }
      }
    }

    return res.json({
      messages: messagesArr
    });
  } catch (error) {
    console.log('error', error);
    return {
      error: error.toString()
    };
  }
};