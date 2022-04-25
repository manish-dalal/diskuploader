"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = void 0;

var _message = require("./message.model");

const messages = {};
exports.messages = messages;

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
      category: 1
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