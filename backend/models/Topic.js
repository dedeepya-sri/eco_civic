const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const topicSchema = new mongoose.Schema({
  title: String,
  youtube_links: [String],
  article_link: String,
  quiz: [quizSchema]
});

module.exports = mongoose.model("Topic", topicSchema);
