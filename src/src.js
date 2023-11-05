const form = document.myForm;
const inpLink = document.querySelector(".userLink");
let link;

//console.log({form, inpLink});


async function handleLink(e) {
try {
  e.preventDefault();
  link = inpLink.value;
  // TODO  validatate instagram URL.

  if (!link.includes("instagram")) {
    alert("Only instagram links are supported");
    this.reset();
    return;
  }

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
    console.log("link updated");
}

form.addEventListener('submit', handleLink);
