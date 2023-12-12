
const form = document.myForm;
const inpLink = document.querySelector(".userLink");
let link;
const downloadLink = document.querySelector(".downloadLink");

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
  } catch (err) {
    console.error(err);
  }
}

async function updateURL(newURLS) {
  try {
    const response = await fetch("/setUrl", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ newURL: newURLS }),
    })
    .then(respo => {
      return respo.json();
    })
    .then(data => {
      const fD = data.newLink;
      console.log(fD);
      getDURL(fD);
    })

    //if (response.status == 200) await getURL();

    console.log("link updated");
    //console.log(response.body);
  } catch (err) {
    console.error(err); //make this an error visible to user.
  }
}

async function getDURL(dLink) {

      downloadLink.href = `${dLink}`;
       downloadLink.style.display = "block";
    
    }

form.addEventListener("submit", handleLink);


