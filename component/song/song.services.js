const Song = require("./song.model");

const findAndPopulate = async (
  query = {},
  selectQuery = {},
  path = "user",
  pathQuery = "-password",
  findMode = "one",
  sortQuery = { _id: -1 }
) => {
  const song = await Song.find(query)
    .select(selectQuery)
    .populate({
      path: path,
      select: pathQuery,
    })
    .sort(sortQuery);

  if (findMode === "one") {
    return song[0];
  }
  return song;
};

const saveSongWithPayload = async (payload = {}) => {
  const song = new Song(payload);
  await song.save();

  return song;
};
exports.createSong = async (payload) => {
  const song = await saveSongWithPayload(payload);
  const savedSong = await findAndPopulate(
    { _id: song._id },
    null
    // "userId",
    // "name email avatar"
  );

  return savedSong;
};

////////////////////////////////////////////////////////////////////////////

const findSong = async (query = {}, findMode = "one", page, size) => {
  const song = await Song.find(query);
  if (findMode === "one") {
    return song[0];
  }
  return song;
};

// let { page, size } = req.query;

// if (!page) {
// 	page = 1;
// }
// if (!size) {
// 	size = 10;
// }

// const limit = parseInt(size);
// const skip = (page - 1) * size;

// const Songs = await Song.find({}, {}, {limit: limit, skip : skip})
// const Songs = await Song.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkSongOwnership = async (userId) => {
  const song = await findSong({ userId });

  if (isEmpty(song)) {
    return false;
  }

  return true;
};

exports.fetchAllProperties = async (id) => {
  const song = await Song.find({ status: "active", landlord: id }).populate(
    "landlord tenant",
    "-password"
  );
  return song;
};

// exports.editSong = async (id, SongObj) => {
// 	await updateSong(query, SongObj);

// 	const Song = await findAndPopulate(
// 		{
// 			...query
// 		},
// 		null,
// 		'userId',
// 		'name email avatar'
// 	);

// 	return Song;
// };

exports.editSong = async (id, userId, songObj) => {
  const updatedSong = await Song.findOneAndUpdate(
    { _id: id, landlord: userId },
    { $set: songObj },
    { new: true }
  );
  return updatedSong;
};

exports.deleteOneSong = async (id, userId) => {
  let deletedSong = await Song.findOneAndUpdate(
    { _id: id, landlord: userId },
    { $set: { status: "inactive" } },
    { new: true }
  );
  return deletedSong;
};

exports.fetchASong = async (id, userId) => {
  let singleSong = await Song.findOne({
    _id: id,
    landlord: userId,
    status: "active",
  }).populate("landlord, tenant, Song", "-password");
  return singleSong;
};
