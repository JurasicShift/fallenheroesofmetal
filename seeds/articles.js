const mongoose = require("mongoose");
const Article = require("../models/articles");
mongoose.connect("mongodb://localhost:27017/fhmtest", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB...");
})
.catch((err) => {
    console.log("THERE'S BEEN AN ERROR: ", err);
});

const seedArticles = [
  {
    member: {
      username: "MickyLove",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Ulrich Statue?",
    article:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    likes: 12,
    dislikes: 0,
    comments: [
      { title: "This is bull", author: "Billy Thrust" },
      { title: "Better bull than never", author: "Billy Thrust" },
      { title: "Trevor", author: "Billy Thrust" },
    ],
  },
  {
    member: {
      username: "BigLes",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Dime or Phil?",
    article:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    likes: 3,
    dislikes: 0,
    comments: [{ title: "This is bull", author: "Perigrin Smith" }, { title: "Better bull than never", author: "Paul Lever" }],
  },
  {
    member: {
      username: "MickyLove",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Ulrich Statue?",
    article:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    likes: 12,
    dislikes: 0,
    comments: [
      { title: "This is bull", author: "Billy Thrust" },
      { title: "Better bull than never", author: "George Wolf"  },
      { title: "Trevor", author: "George Wolf"  },
    ],
  },
  {
    member: {
      username: "BigLes",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Dime or Phil?",
    article:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    likes: 3,
    dislikes: 0,
    comments: [{ title: "This is bull", author: "Billy Thrust" }, { title: "Better bull than never", author: "Billy Thrust" }],
  },
  {
    member: {
      username: "MickyLove",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Ulrich Statue?",
    article:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    likes: 12,
    dislikes: 0,
    comments: [
      { title: "This is bull", author: "Billy Thrust" },
      { title: "Better bull than never", author: "Billy Thrust" },
      { title: "Trevor", author: "Billy Thrust" },
    ],
  },
  {
    member: {
      username: "BigLes",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Dime or Phil?",
    article:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    likes: 3,
    dislikes: 0,
    comments: [{ title: "This is bull", author: "Billy Thrust" }, { title: "Better bull than never", author: "Billy Thrust" }],
  },
  {
    member: {
      username: "MickyLove",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Ulrich Statue?",
    article:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    likes: 12,
    dislikes: 0,
    comments: [
      { title: "This is bull", author: "Billy Thrust" },
      { title: "Better bull than never", author: "Billy Thrust" },
      { title: "Trevor", author: "Billy Thrust" },
    ],
  },
  {
    member: {
      username: "BigLes",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Dime or Phil?",
    article:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    likes: 3,
    dislikes: 0,
    comments: [{ title: "This is bull", author: "Billy Thrust" }, { title: "Better bull than never", author: "Billy Thrust" }],
  },
  {
    member: {
      username: "MickyLove",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Ulrich Statue?",
    article:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    likes: 12,
    dislikes: 0,
    comments: [
      { title: "This is bull", author: "Billy Thrust" },
      { title: "Better bull than never", author: "Billy Thrust" },
      { title: "Trevor", author: "Billy Thrust" },
    ],
  },
  {
    member: {
      username: "BigLes",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Dime or Phil?",
    article:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    likes: 3,
    dislikes: 0,
    comments: [{ title: "This is bull", author: "Billy Thrust" }, { title: "Better bull than never", author: "Billy Thrust" }],
  },
  {
    member: {
      username: "MickyLove",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Ulrich Statue?",
    article:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    likes: 12,
    dislikes: 0,
    comments: [
      { title: "This is bull", author: "Billy Thrust" },
      { title: "Better bull than never", author: "Billy Thrust" },
      { title: "Trevor", author: "Billy Thrust" },
    ],
  },
  {
    member: {
      username: "BigLes",
    },
    date: "11 Nov 2019, 16: 14",
    title: "Dime or Phil?",
    article:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    likes: 3,
    dislikes: 0,
    comments: [{ title: "This is bull", author: "Billy Thrust" }, { title: "Better bull than never", author: "Billy Thrust" }],
  },
];

const seedDB = async () => {
  try {
    await Article.deleteMany({});
    // await Article.insertMany(seedArticles);
    console.log("looks like it worked");
  } catch(e) {
    console.log("Failed dude: ", e);
  }

}
seedDB().then(() => {
  mongoose.connection.close();
});
