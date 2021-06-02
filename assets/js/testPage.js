console.log("hello on test page");

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

function linkSimilar() {
  console.log("in linkSimilar");

  snowplow('trackSelfDescribingEvent', {
    schema: 'iglu:test.mwilson/test-link/jsonschema/1-0-0',
    data: {
      linkId: "actually just a string for now"
    }
  });
}

const link = document.getElementById("test-link");
link.addEventListener("mouseover", linkNowhere);

const anotherLink = document.getElementById("test-link2");
anotherLink.addEventListener("click", linkSimilar);
