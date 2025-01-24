const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    msgByUserId: { 
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User", 
    },
  },
  {
    timestamps: true, // Fix: Correctly use timestamps
  }
);

// Add custom validation to ensure at least one of text, imageUrl, or videoUrl is present
messageSchema.pre("validate", function (next) {
  if (!this.text && !this.imageUrl && !this.videoUrl) {
    return next(new Error("At least one of text, imageUrl, or videoUrl is required."));
  }
  next();
});

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", messageSchema);
const ConversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = { MessageModel, ConversationModel };
