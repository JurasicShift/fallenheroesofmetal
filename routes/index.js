const express = require("express");
const router = express.Router();

const Control =  require("../controllers/index");
const { requireLogin, existingClient, previousUrl, listManager } = require("../middleware");
const { joiLogin, joiSignup, joiArticle, joiComment } = require("../joischemas");

router.get("/",  Control.landing);

router.get("/home", previousUrl, Control.home);

router.get("/cliff", previousUrl, Control.cliff);

router.get("/cliffdisc", previousUrl, Control.cliffDisc);

router.get("/dime", previousUrl, Control.dime);

router.get("/dimedisc", previousUrl, Control.dimeDisc);

router.get("/dio", previousUrl, Control.dio);

router.get("/diodisc", previousUrl, Control.dioDisc);

router.get("/jeff", previousUrl, Control.jeff);

router.get("/jeffdisc", previousUrl, Control.jeffDisc);

router.get("/lemmy", previousUrl, Control.lemmy);

router.get("/lemmydisc", previousUrl, Control.lemmyDisc);

router.get("/phil", previousUrl, Control.phil);

router.get("/phildisc", previousUrl, Control.philDisc);

router.get("/vinnie", previousUrl, Control.vinnie);

router.get("/vinniedisc", previousUrl, Control.vinnieDisc);

router.get("/randy", previousUrl, Control.randy);

router.get("/randydisc", previousUrl, Control.randyDisc);

router.get("/chuck", previousUrl, Control.chuck);

router.get("/chuckdisc", previousUrl, Control.chuckDisc);

router.get("/bon", previousUrl, Control.bon);

router.get("/bondisc", previousUrl, Control.bonDisc);

router.get("/signlog", Control.signLog);

router.get("/logout",  Control.logOut);

router.post("/signup", joiSignup, existingClient, Control.signUp);

router.post("/signin", joiLogin, Control.signIn);

router.get("/contact", previousUrl, Control.contact);

router.get("/references", previousUrl, Control.references);

router.get("/merch", previousUrl, Control.merch);

router.get("/cart", previousUrl, Control.cart);

router.get("/forum", previousUrl, Control.forum);

router.get("/forum/:slug", previousUrl, Control.getArticle);

router.get("/myarticles", requireLogin, previousUrl, Control.getMyArticles);

router.get("/newarticle", previousUrl, Control.newArticle);

router.post("/newarticle",  requireLogin, joiArticle, Control.postArticle);

router.get("/edit/:slug", previousUrl, Control.getEditArticle);

router.put("/edit/:slug", requireLogin, joiArticle, Control.editArticle);

router.post("/comment/:slug", requireLogin, joiComment, Control.postComment);

router.post("/reply/:slug/:commentId", requireLogin, joiComment, Control.postReply);

router.delete("/deleteReply/:slug/:commentId", requireLogin, Control.deleteReply);

router.delete("/deleteArticle/:slug", requireLogin, Control.deleteArticle);

router.get("/likes", listManager, Control.getLikes);

module.exports = router;