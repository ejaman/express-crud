// blog content의 버튼 3개 기능
const btn = document.getElementById("list");
const update = document.getElementById("update");
const del = document.getElementById("delete");

btn.addEventListener("click", () => {
  location.href = "/memo";
});

del.addEventListener("click", () => {
  fetch(`http://localhost:3000/blog/delete/${del.dataset.doc}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => (window.location.href = data.redirect))
    .catch((err) => console.log(err));
});

// update => 기존 글 내용 가져오기 => 수정 후 post로 전송
// update.addEventListener("click", () => {
//   location.href = `/memo/updated/${update.dataset.doc}`;
// });
