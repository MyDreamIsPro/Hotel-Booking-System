import Message from "../models/message.js";
import User from "../models/user.js";
import GroupChat from "../models/chat_group.js";
import { STRING, INTEGER } from "../constants/constants.js";

export const getListMessage = async (req, res) => {
  const { group_id } = req.params;
  try {
    const group = await GroupChat.findOne({ _id: group_id }).populate("users");

    if (!group) return res.status(404).send(STRING.GROUP_NOT_FOUND);

    const list_message = await Message.find({ chat_group: group_id })
      .populate("sender")
      .lean();
    for (let message of list_message) {
      message.sender._id = message.sender._id.toString();
    }
    // setTimeout(() => {
    res.status(202).json({
      group: group,
      list_message: list_message,
    });
    // }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.GROUP_NOT_FOUND);
  }
};

export const searchUserForChat = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.find(
      {
        $and: [
          { role: { $ne: INTEGER.CUSTOMER_ROLE } },
          { full_name: { $regex: ".*" + data.name + ".*", $options: "i" } },
          { _id: { $ne: req._id } },
        ],
      },
      "_id full_name profile_image"
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const searchChatGroup = async (req, res) => {
  const { partner_id } = req.params;
  const finder_id = req._id;
  try {
    const finder = await User.findOne({ _id: finder_id })
      .populate("chat_groups")
      .lean();

    let found_group;
    let found = false;

    for (let group of finder.chat_groups) {
      for (let user of group.users) {
        if (group.private && user.toString() === partner_id) {
          found = true;
          found_group = group._id;
          break;
        }
      }
    }
    if (found) {
      found_group = await GroupChat.findOne({ _id: found_group });
    } else {
      // if 2 users do not have a conversation yet
      found_group = new GroupChat({
        name: "",
        users: [finder_id, partner_id],
        last_user: finder_id,
        private: true,
        isEmpty: true,
        created_date: new Date(),
      });
      await found_group.save();
      await User.updateMany(
        { $or: [{ _id: finder_id }, { _id: partner_id }] },
        {
          $push: { chat_groups: found_group._id },
        }
      );
    }

    res.status(200).json(found_group._id.toString());
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createGroupChat = async (req, res) => {
  const data = req.body;
  try {
    data.members = JSON.parse(data.members);
    const members = data.members.map((item) => item._id);
    members.push(req._id);
    const TIME_STAMP = new Date();
    const group = new GroupChat({
      name: data.name,
      users: members,
      profile_image: data.profile_image,
      private: false,
      isEmpty: false,
      admin: req._id,
      modified_date: TIME_STAMP,
      created_date: TIME_STAMP,
    });
    await group.save();
    await User.updateMany(
      { _id: { $in: members } },
      {
        $push: { chat_groups: group._id },
      }
    );
    res.status(200).send(group._id);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
