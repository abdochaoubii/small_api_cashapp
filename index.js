const express = require("express");
const app = express();
const {Reserve, User } = require("./db");


const cors = require("cors");

app.use(cors());



app.use(express.json());


app.post('/api/users', async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;
  const receiverphoneNumber =phoneNumber;

    // console.log({username, password});
    Reserve.find({ receiverphoneNumber }, async(err, reserves) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error finding user');
      } else {
        const reserve = reserves;
        console.log(reserve)
        // send SMS to user's phone number
        // res.status(200).send("reserve");
        // return 0;
      }
    });
    const user = new User({ username, password, phoneNumber });
    await user.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create user');
  }
});


app.post('/api/sendsms', (req, res) => {
  const { amount, senderphoneNumber,receiverphoneNumber} = req.body;
  const phoneNumber =receiverphoneNumber;
  
  User.find({ phoneNumber }, async(err, users) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error finding user');
    } else if (users.length === 0) {
      const user = new Reserve({ amount,senderphoneNumber,receiverphoneNumber});
      await user.save();
      res.status(404).send('User not found We send him a message');
    } else {
      const user = users[0];
      console.log(user)
      // send SMS to user's phone number
      res.status(200).send('SMS sent successfully');
    }
  });
});


// app.get('/api/sendsms',async (req, res) => {
//   // const { phoneNumber } = req.body;
//   const { amount, senderphoneNumber } = req.body;

//   User.find({ senderphoneNumber }, async (err, users) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Error finding user');
//     } else if (users.length === 0) {
//       // const user = new Reserve({ amount, False,senderphoneNumber });
//       // await user.save();
//       res.status(404).send('Send msg');
//     } else {
//       const user = users[0];
//       console.log(user)
//       // send SMS to user's phone number
//       res.status(200).send('SMS sent successfully');
//     }
//   });
// });

app.listen(3000, () => {
  console.log("Quiz app listening on port 3000!");
});