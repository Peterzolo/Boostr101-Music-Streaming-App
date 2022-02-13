

 const  mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
         type: String, 
         required: true 
        },
	email: 
    { type: String,
         unique: true,
          required: true 
        },
	password: 
    { type: String,
         required: true 
        },
	gender: 
    { type: String,
         required: true
         },
	month: 
    { type: String, 
        required: true 
    },
	date: 
    { type: String,
         required: true 
        },
	year: 
    { type: String,
         required: true 
        },
	likedSongs: 
    { type: [String],
         default: [] 
        },
	playlists: 
    { type: [String],
         default: [] 
        },
	isAdmin: 
    { type: Boolean,
         default: false
         },
});

const User = mongoose.model('user', userSchema);
