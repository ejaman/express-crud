const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

// autoincrement를 위한 초기화 과정
// autoIncrement.initialize(mongoose);

const memo = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    no: Number,
  },
  {
    timestamps: true, // 데이터가 기록될 때 마다 시간을 자동으로 기록
  }
);

const memoModel = mongoose.model("memo", memo);
module.exports = memoModel;
