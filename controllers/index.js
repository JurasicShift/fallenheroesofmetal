const Article = require("../models/articles");
const Comment = require("../models/comments");
const Member = require("../models/members");
const  wrapAsync  = require("../utilities/wrapasync");
const  AppError  = require("../utilities/apperror");


const landing = (req, res) => {
  const page = "";
  res.render("landing", { page });
};

const home = (req, res) => {
  const page = "Home";
  res.render("home", { page });
};

const cliff = (req, res) => {
  const page = "Cliff";
  res.render("cliff", { page });
};

const cliffDisc = (req, res) => {
  const page = "Cliff Discography";
  res.render("discs/cliff", { page });
};

const dime = (req, res) => {
  const page = "Dime";
  res.render("dime", { page });
};

const dimeDisc = (req, res) => {
  const page = "Dime Discography";
  res.render("discs/pantera", { page });
};

const dio = (req, res) => {
  const page = "Dio";
  res.render("dio", { page });
};

const dioDisc = (req, res) => {
  const page = "Dio Discography";
  res.render("discs/dio", { page });
};

const jeff = (req, res) => {
  const page = "Jeff";
  res.render("jeff", { page });
};

const jeffDisc = (req, res) => {
  const page = "Jeff Discography";
  res.render("discs/jeff", { page });
};

const lemmy = (req, res) => {
  const page = "Lemmy";
  res.render("lemmy", { page });
};

const lemmyDisc = (req, res) => {
  const page = "Lemmy Discography";
  res.render("discs/lemmy", { page });
};

const phil = (req, res) => {
  const page = "Phil";
  res.render("phil", { page });
};

const philDisc = (req, res) => {
  const page = "Phil Discography";
  res.render("discs/phil", { page });
};

const vinnie = (req, res) => {
  const page = "Vinnie";
  res.render("vinnie", { page });
};

const vinnieDisc = (req, res) => {
  const page = "Vinnie Discography";
  res.render("discs/pantera", { page });
};

const randy = (req, res) => {
  const page = "Randy";
  res.render("randy", { page });
};
const randyDisc = (req, res) => {
  const page = "Randy Discography";
  res.render("discs/randy", { page });
};

const chuck = (req, res) => {
  const page = "Chuck";
  res.render("chuck", { page });
};

const chuckDisc = (req, res) => {
  const page = "Chuck Discography";
  res.render("discs/chuck", { page });
};

const bon = (req, res) => {
  const page = "Bon";
  res.render("bon", { page });
};

const bonDisc = (req, res) => {
  const page = "Bon Discography";
  res.render("discs/bon", { page });
};

const signLog = (req, res) => {
  const page = "Signup/Login";
  const referer = req.headers.referer;
  res.render("signlog", { page, referer });
};

const signUp = wrapAsync(async (req, res) => {
  if (req.body.signupCheck && req.body.password === req.body.confirmPassword) {
    const { password, username, email } = req.body;
    const member = new Member({
      username,
      email,
      password,
    });
    await member.save();
    req.session.login = true;
    req.session.username = member.username;
    req.flash("success", `Welcome to F.H.M ${member.username}!`);
    res.redirect(req.session.returnTo);
  } else {
    req.flash("error", "Sign up failed. Check your details.");
    res.redirect("/signLog");
  }
});

const signIn = wrapAsync(async (req, res) => {
  const { password, username } = req.body;
  const foundUser = await Member.findAndValidate(username, password);
  if (foundUser) {
    req.session.login = true;
    req.session.username = foundUser.username;
    if (req.session.returnTo) {
       req.flash("success", `Welcome back ${foundUser.username}!`);
      res.redirect(req.session.returnTo);
    } else {
       req.flash("success", `Welcome back ${foundUser.username}!`);
      res.redirect("/home");
    }
  } else {
    req.flash("error", "Sign in failed. Check your details.");
    res.redirect("/signLog");
  }
});

const logOut = (req, res) => {
  req.session.login = false;
  const name = req.session.username;
  if (req.session.returnTo) {
    req.flash("success", `See you soon ${name}!`); 
    res.redirect(req.session.returnTo);
    req.session.username = null;
  } else {
    req.flash("success", `See you soon ${name}!`);
    res.redirect("/home");
    req.session.username = null;
  }
};

const contact = (req, res) => {
  const page = "Contact";
  res.render("contact", { page });
};

const references = (req, res) => {
  const page = "References";
  res.render("references", { page });
};

const merch = (req, res) => {
  const page = "Merch";
  res.render("merch", { page });
};

const cart = (req, res) => {
  const page = "Cart";
  res.render("cart", { page });
};

const forum = wrapAsync(async (req, res) => {
  const page = "Forum";
  const articles = await Article.find().sort({ date: -1 });
  if(!articles) {
    req.flash("error", "Sorry the forum is not responding.");
    res.redirect(req.session.returnTo);
  }
  res.render("forum", { page, articles });
});

const getArticle = wrapAsync(async (req, res) => {
  const slug = { slug: req.params.slug };
  const page = "Article";
  let article = await Article.findOne(slug).populate({
    path: "comments",
    model: "Comment",
    options: {
      sort: { date: -1 },
    },
    populate: [
      {
        path: "replies",
        model: "Comment",
        populate: [
          {
            path: "replies",
            model: "Comment",
          },
        ],
      },
    ],
  });
  if(!article) {
    req.flash("error", "Sorry, cannot find the article.");
    res.redirect(req.session.returnTo);
  }
  res.render("show", { page, article });
});

const getMyArticles = wrapAsync(async (req, res) => {
  const page = "My Articles";
  const obj = await Member.findOne({ username: req.session.username }).populate(
    {
      path: "articles",
      model: "Article",
      options: {
        sort: { date: -1 },
      },
    }
  );
  const articles = obj.articles;
  if(!articles) {
    req.flash("error", "Sorry, cannot find your articles.");
    res.redirect(req.session.returnTo);
  }
  res.render("forum", { page, articles });
});

const newArticle = (req, res) => {
  const page = "New Article";
  res.render("newarticle", { page });
};

const postArticle = wrapAsync(async (req, res) => {
  const member = await Member.findOne({ username: req.session.username });
  const article = new Article({
    username: member.username,
    date: res.locals.date,
    title: req.body.title,
    article: req.body.article,
  });
  member.articles.push(article);
  await article.save();
  await member.save();

  if(!article || !member) {
    req.flash("error", "Sorry, could not post article.");
    res.redirect(req.session.returnTo);
  }
  req.flash("success", `Your article has been posted!`);
  res.redirect(`/forum/${article.slug}`);
});

const getEditArticle = wrapAsync(async (req, res) => {
  const slug = { slug: req.params.slug };
  const page = "Edit";
  const article = await Article.findOne(slug);
  if(!article) {
    req.flash("error", "Sorry, couldn't retrieve your article.");
    res.redirect(req.session.returnTo);
  }
  res.render("newarticle", { page, article });
});

const editArticle = wrapAsync(async (req, res) => {
  const slug = { slug: req.params.slug };
  const article = await Article.findOneAndUpdate(slug, req.body, {returnDocument: 'after'});
  const newArticle = await article.save();
  if(!article) {
    req.flash("error", "Sorry, article edit failed.");
    res.redirect(req.session.returnTo);
  }
  req.flash("success", "Article updated!");
  res.redirect(`/forum/${newArticle.slug}`);
});

const deleteArticle = wrapAsync(async (req, res) => {
  const slug = { slug: req.params.slug };
  const article = await Article.findOneAndDelete(slug);
  await Member.updateOne(
    { username: article.username },
    { $pull: { articles: article._id } }
  );
  if (article.comments.length) {
    const comDel = await Comment.deleteMany({
      _id: { $in: article.comments },
    });
  }
  if(!article) {
    req.flash("error", "Sorry, couldn't delete this article.");
    res.redirect(req.session.returnTo);
  }
  req.flash("success", "Article Deleted!");
  res.redirect("/forum");
});

const postComment = wrapAsync(async (req, res) => {
  const slug = { slug: req.params.slug };
  const member = await Member.findOne({ username: req.session.username });
  const comment = req.body.comment;
  const newComment = new Comment({
    username: member.username,
    date: res.locals.date,
    comment: comment,
    commentBool: true,
  });
  await newComment.save();
  const article = await Article.findOneAndUpdate(slug, {
    $push: { comments: newComment },
  });
  if(!member || !newComment) {
    req.flash("error", "Sorry, there's a problem posting your comment.");
    res.redirect(req.session.returnTo); 
   }
  res.redirect(`/forum/${slug.slug}`);
});

const postReply = wrapAsync(async (req, res) => {
  const slug = { slug: req.params.slug };
  const commentId = { _id: req.params.commentId };
  const member = await Member.findOne({ username: req.session.username });
  const previousComment = await Comment.findById(commentId);
  const comment = req.body.comment;
  const newComment = new Comment({
    username: member.username,
    date: res.locals.date,
    comment: comment,
    depth: previousComment.depth + 1,
  });
  await newComment.save();
  const commentReplyRef = await Comment.findOneAndUpdate(commentId, {
    $push: { replies: newComment },
  });
  if(!member || !newComment) {
    req.flash("error", "Sorry, there's a problem posting your reply.");
    res.redirect(req.session.returnTo);
    }
  res.redirect(`/forum/${slug.slug}`);
});

const deleteReply = wrapAsync(async (req, res) => {
  const slug = { slug: req.params.slug };
  const commentId = { _id: req.params.commentId };
  const comment = await Comment.findByIdAndDelete(commentId);
  if (comment.depth === 0) {
    const article = await Article.updateOne(
      { comments: commentId._id },
      { $pull: { comments: commentId._id } }
    );
  }
  if (comment.replies.length) {
    const replies = await Comment.deleteMany({
      _id: { $in: comment.replies },
    });
  }
  if (comment.depth > 0) {
    const replies = await Comment.updateOne(
      { replies: commentId._id },
      { $pull: { replies: commentId._id } }
    );
  }
  if(!comment) {
    req.flash("error", "Sorry, there's a problem deleting your comment.");
    res.redirect(req.session.returnTo);  
  }
  res.redirect(`/forum/${slug.slug}`);
});

const getLikes = wrapAsync(async (req, res) => {
  const id = req.headers["comment-id"];
  const type = req.headers["comment-type"];
  const likeValue = req.headers["like-value"];
  let plusMinus = req.plusMinus;

  if (type === "article") {
    const article = await Article.findByIdAndUpdate(
      id,
      { $inc: { [likeValue]: plusMinus } },
      { new: true }
    );
    if(!article) {
      req.flash("error", "Sorry, there's a problem adding your 'like'.");
      res.redirect(req.session.returnTo);   
     }
  } else {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $inc: { [likeValue]: plusMinus } },
      { new: true }
    );
    if(!comment) {
      req.flash("error", "Sorry, there's a problem adding your 'like'.");
      res.redirect(req.session.returnTo);     
    }
  }
  res.redirect(req.session.returnTo);
});

module.exports = {
  landing,
  home,
  cliff,
  cliffDisc,
  dime,
  dimeDisc,
  dio,
  dioDisc,
  jeff,
  jeffDisc,
  lemmy,
  lemmyDisc,
  phil,
  philDisc,
  vinnie,
  vinnieDisc,
  randy,
  randyDisc,
  chuck,
  chuckDisc,
  bon,
  bonDisc,
  signLog,
  signUp,
  signIn,
  logOut,
  contact,
  references,
  merch,
  cart,
  forum,
  getArticle,
  newArticle,
  postArticle,
  getEditArticle,
  editArticle,
  deleteArticle,
  postComment,
  postReply,
  deleteReply,
  getMyArticles,
  getLikes,
};
