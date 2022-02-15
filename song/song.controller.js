const Song = require("./song.model");

exports.addSong = async (req, res) => {
  const body = req.body;
  try {
    const newSong = await new Song({
      title: body.title,
      artiste: body.artiste,
      song: body.song,
      img: body.img,
      duration: body.duration,
    });
    const savedSong = await newSong.save();
    res.status(200).json({
      success: true,
      message: "Song successffully added",
      content: savedSong,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not add the song", error });
  }
};
