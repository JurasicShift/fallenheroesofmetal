const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    username:{
        type: String,
        required: true,
         },
        date: {
             type: String,
             required: true
        },
        title: {
            type: String,
            trim: true
        },
        article: {
            type: String,
            required: true,
            trim: true
        },
        likes: {
            type: Number
        },
        dislikes: {
            type: Number
        },
        comments: [{
                type: Schema.Types.ObjectId,
                 ref: "Comment"
            }],
        slug: {
            type: String
            //unique: true,
            //required: true
        }
})


articleSchema.pre("save", function(next) {

    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    next();
})


const Article = mongoose.model("Article", articleSchema);
module.exports = Article;