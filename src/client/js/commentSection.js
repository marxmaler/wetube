import { async } from "regenerator-runtime";

const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const commentIcon = document.createElement("i");
  commentIcon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `  ${text}`;
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash-alt";
  deleteIcon.addEventListener("click", removeComment);
  newComment.appendChild(commentIcon);
  newComment.appendChild(span);
  newComment.appendChild(deleteIcon);
  videoComments.prepend(newComment);
};

const removeComment = (event) => {
  const li = event.target.parentElement;
  const { id } = li.dataset;
  fetch(`/api/videos/${id}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  li.remove();
};
const removeCommentBtns = document.querySelectorAll(".fa-trash-alt");
removeCommentBtns.forEach((i) => i.addEventListener("click", removeComment));

if (form) {
  const addCommentBtn = document.getElementById("addCommentBtn");
  const textarea = form.querySelector("textarea");
  const changeBtnOpacity = () => {
    if (textarea.value !== "") {
      addCommentBtn.style.opacity = 1;
    } else {
      addCommentBtn.style.opacity = 0.7;
    }
  };
  textarea.addEventListener("input", changeBtnOpacity);
  textarea.addEventListener("change", changeBtnOpacity);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const videoId = videoContainer.dataset.id;
    const text = textarea.value;
    if (text === "") {
      return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (response.status === 201) {
      textarea.value = "";
      const { newCommentId } = await response.json();
      addComment(text, newCommentId);
    }
  };

  form.addEventListener("submit", handleSubmit);
}
