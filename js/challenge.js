const counter = document.querySelector("#counter");
const incrementCountBtn = document.querySelector("#plus");
const decrementCountBtn = document.querySelector("#minus");
const likeCountBtn = document.querySelector("#heart");
const likeList = document.querySelector(".likes");
const pauseBtn = document.querySelector("#pause");
const commentForm = document.querySelector("#comment-form");
const commentList = document.querySelector("#list");

const getCount = () => {
  return parseInt(counter.textContent);
};
const incrementCount = () => {
  counter.textContent = getCount() + 1;
};
const decrementCount = () => {
  counter.textContent = getCount() - 1;
};
const likeCount = () => {
  const count = getCount();
  const id = `like-${count}`;
  const countLi = document.querySelector(`#${id}`);
  if (countLi) {
    const numLikes = parseInt(countLi.textContent.split(" ").slice(-2, -1));
    countLi.textContent = `${count} was liked ${numLikes + 1} times`;
  } else {
    const li = document.createElement("li");
    li.id = id;
    li.textContent = `${count} was liked 1 time`;
    likeList.append(li);
  }
};
let intervalId = setInterval(incrementCount, 1000);
let isDisabled = false;
const pauseCount = () => {
  isDisabled = !isDisabled;
  incrementCountBtn.disabled = isDisabled;
  decrementCountBtn.disabled = isDisabled;
  likeCountBtn.disabled = isDisabled;
  if (isDisabled) {
    clearInterval(intervalId);
    pauseBtn.textContent = "resume";
  } else {
    intervalId = setInterval(incrementCount, 1000);

    pauseBtn.textContent = "pause";
  }
};

const addComment = (e) => {
  e.preventDefault();
  const p = document.createElement("p");
  p.textContent = e.target.comment.value;
  commentList.append(p);
};
incrementCountBtn.addEventListener("click", incrementCount);
decrementCountBtn.addEventListener("click", decrementCount);
likeCountBtn.addEventListener("click", likeCount);
pauseBtn.addEventListener("click", pauseCount);
commentForm.addEventListener("submit", addComment);
