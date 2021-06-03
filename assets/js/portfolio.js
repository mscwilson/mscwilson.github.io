// const githubLinksHTML = document.getElementsByClassName("github-link")
// const githubLinks = Array.from(githubLinksHTML)

// // console.log(githubLinks[0]);
// githubLinks.forEach(link => {
//   console.log(link.href);
// });

let selectedTitle;
const section = document.getElementById("portfolio")

section.onclick = function(event) {
  console.log("start of onclick");

  const target = event.target;

  console.log(target);
  console.log(target.classList);

  if (!target.classList.contains("card-title")) {
    return
  }



  highlight(target)
};

function highlight(title) {
  selectedTitle = title
  selectedTitle.classList.add('highlight')
  console.log("here in highlight");
}

