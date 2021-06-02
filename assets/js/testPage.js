console.log("hello on test page");

const link = document.getElementById("test-link");

function linkNowhere() {
  console.log("in linkNowhere");

  snowplow('trackStructEvent', {
    category: 'link-test',
    action: 'hover',
    label: 'nowhere new',
    property: '',
    value: ''
  });
}

link.addEventListener("mouseover", linkNowhere);
