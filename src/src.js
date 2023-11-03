const form = document.myForm;
const inpLink = document.querySelector(".userLink");
let link;

//console.log({form, inpLink});


async function handleLink(e) {
try {
  e.preventDefault();
  link = inpLink.value;

  // TODO: validate that the url is a reel.

  // TODO: get the reel from api with the link retrieved.
// send the validated response to the server

  await updateURL(link);
  //await fetchFromProxy();
  this.reset();
    } catch(err) {
        console.error(err);
    }
}

async function updateURL(newURLS) {
    const response = await fetch("/setUrl", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ newURL: newURLS }),
    });
}

form.addEventListener('submit', handleLink);
