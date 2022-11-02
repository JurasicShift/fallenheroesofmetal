const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    replies : [ {
        type: Schema.Types.ObjectId,
         ref: "Comment"
     }],
     depth: {
        type: Number,
        default: 0
     }
})

commentSchema.pre("deleteMany", async function(next) {
    try{
        const deletedData = await Comment.find(this._conditions).lean();
        for(let obj of deletedData) {
            for(let element of obj.replies) {
                const newDelete = await Comment.findByIdAndDelete(element);
                if(newDelete.replies.length) {
                    for(let item of newDelete.replies) {
                        const newDelete = await Comment.findByIdAndDelete(item);
                    }
                }
            }
        }
        return next();
    } catch(err) {
        return next(err);
    }
})


const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;