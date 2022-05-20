const express = require("express");
const memoSchema = require("../models/memos");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await memoSchema.find({}).exec();
  res.render("memo/memo", { content: result });
});

// create 기능 - write 창 띄우기
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

// read 기능
router.get("/read/:id", async (req, res) => {
  const no = req.params.id;
  const result = await memoSchema.findOne({ no: no }).exec();
  res.render("memo/content", { content: result });
});

// delete 기능
router.delete("/delete/:id", async (req, res) => {
  const no = req.params.id;
  const del = await memoSchema.findOneAndDelete({ no: no });
  // catch err?
  return res.status(200).json({ redirect: "/memo" });
});

// update 기능
router.get("/update/:id", async (req, res) => {
  const no = req.params.id;
  // exec 다시 확인해보기
  const result = await memoSchema.findOne({ no: no }).exec();
  res.render("memo/update", { content: result });
});
router.post("/updated/:id", async (req, res) => {
  const no = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  await memoSchema.findOneAndUpdate({ no: no }, { title, content }).exec();
  const updated = await memoSchema.findOne({ no: no }).exec();
  res.render("memo/content", { content: updated });
});
module.exports = router;
