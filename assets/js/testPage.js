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

  // snowplow('trackSelfDescribingEvent', {
  //   schema: 'iglu:test.mwilson/test-link/jsonschema/1-0-0',
  //   data: {
  //     linkId: "actually just a string for now"
  //   }
  // });

  snowplow('trackSelfDescribingEvent', {
            schema: 'iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0',
            data: {
                type: "add"
            }
        },
        [{
            schema: 'iglu:test.example.iglu/product_entity/jsonschema/1-0-0',
            data: {
                sku: 'sku',
                name: 'test',
                price: 0.01,
                quantity: 1
            }
        }]
    );
}

const link = document.getElementById("test-link");
link.addEventListener("mouseover", linkNowhere);

const anotherLink = document.getElementById("test-link2");
anotherLink.addEventListener("click", linkSimilar);


