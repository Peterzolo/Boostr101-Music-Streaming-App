const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    reff: "user",
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
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("song", SongSchema);

module.exports = Song;
