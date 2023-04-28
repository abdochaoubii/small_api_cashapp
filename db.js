const mongoose = require("mongoose");


const link = 'mongodb+srv://aizenn:#########@cluster0.pyv4cn0.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(link, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((reselt)=>console.log("connected to db"))
    .catch((error)=>console.log(error));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB!");
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default:500,
    required: false
  }
});

const reserveSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  senderphoneNumber: {
    type: String,
    required: true
  },
  receiverphoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  } ,
  status: {
    type: String,
    enum: ['delivered', 'pending', 'returned'],
    default: 'pending'
  }
});

const User = mongoose.model("User", userSchema);
const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = { Reserve,User };


