const portfolio = document.getElementById("portfolio");

portfolio.onclick = function(event) {
  const target = event.target;

  if (!target.classList.contains("github-link")) return;

  const repoName = target.href.slice(29);

  snowplow('trackSelfDescribingEvent', {
    schema: 'iglu:test.mwilson/github-link/jsonschema/1-0-0',
    data: {
      repoName: repoName
    }
  });
};
