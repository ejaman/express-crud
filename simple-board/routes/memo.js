const express = require("express");
const memoSchema = require("../models/memos");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await memoSchema.find({}).exec();
  res.render("memo/memo", { content: result });
});

// write 창 띄우기
router.get("/write", (req, res) => {
  res.render("memo/write"); // render에는 view의 파일 이름을 넣어주면 된다
});

router.post("/write", (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const memo = new memoSchema({
    title,
    content,
  });

  memo
    .save()
    .then((result) => {
      // 배포할 땐 모든 콘솔을 지워야함 => 보안
      console.log(result);
      res.redirect("/memo");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
