const userRoute = require("./user/user.route");
const userService = require("../component/user/user.service");
const userModel = require("../component/user/user.model");

const songRoute = require("./song/song.routes");
const songService = require("./song/song.services");
const songModel = require("./song/song.model");

const playListRoute = require("./playList/playList.routes");
const playListService = require("./playList/playList.services");
const playListModel = require("./playList/playList.model");

const componentModule = {
  userModule: {
    route: userRoute,
    service: userService,   
    model: userModel,
  },
  songModule: {
    route: songRoute,
    service: songService,    
    model: songModel,
  },
 playListModule: {
    route:playListRoute,
    service:playListService,
    model:playListModel,
  },
};

module.exports = componentModule;