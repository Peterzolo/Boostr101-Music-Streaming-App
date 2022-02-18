const PlayList = require("./playList.model");

const findAndPopulate = async (
  query = {},
  selectQuery = {},
  path = "user",
  pathQuery = "-password",
  findMode = "one",
  sortQuery = { _id: -1 }
) => {
  const playList = await PlayList.find(query)
    .select(selectQuery)
    .populate({
      path: path,
      select: pathQuery,
    })
    .sort(sortQuery);

  if (findMode === "one") {
    return playList[0];
  }
  return playList;
};

const savePlayListWithPayload = async (payload = {}) => {
  const playList = new PlayList(payload);
  await playList.save();

  return playList;
};
exports.createPlayList = async (payload) => {
  const playList = await savePlayListWithPayload(payload);
  const savedPlayList = await findAndPopulate(
    { _id: playList._id },
    null
    // "userId",
    // "name email avatar"
  );

  return savedPlayList;
};

////////////////////////////////////////////////////////////////////////////

const findPlayList = async (query = {}, findMode = "one") => {
  const playList = await PlayList.find(query);
  if (findMode === "one") {
    return playList[0];
  }
  return playList;
};

exports.checkPlayListOwnership = async (userId) => {
  const playList = await findPlayList({ userId });

  if (isEmpty(playList)) {
    return false;
  }

  return true;
};

exports.fetchAllPlayLists = async (userId) => {
  const playList = await PlayList.find({
    user: userId,
    status: "active",
  });
  return playList;
};

exports.editPlayList = async (playListId, userId, playListObj) => {
  const updatedPlayList = await PlayList.findOneAndUpdate(
    { _id: playListId, user: userId },
    { $set: playListObj },
    { new: true }
  );
  return updatedPlayList;   
};

exports.deleteOnePlayList = async (id, userId) => {
  let deletedPlayList = await PlayList.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: { status: "inactive" } },
    { new: true }
  );
  return deletedPlayList;
};

exports.fetchAPlayList = async (id, userId) => {
  let singlePlayList = await PlayList.findOne({
    _id: id,
    user: userId,
    status: "active",
  });
  return singlePlayList;
};
