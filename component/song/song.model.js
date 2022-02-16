const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artiste: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default:
      "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
  },
  duration: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("song", SongSchema);

module.exports = Song;
