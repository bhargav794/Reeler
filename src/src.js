

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
      console.log(respo.body);
      return respo.json();
    })
    .then(data => {
      const fD = data.newOne;
      console.log(fD);
    })

    //if (response.status == 200) await getURL();

    console.log("link updated");
    //console.log(response.body);
  } catch (err) {
    console.error(err); //make this an error visible to user.
  }
}

async function getURL() {
   await fetch("/get-data")
                          .then(response => response.json())
                          .then(data => {
                              const serverVariable = data.sharedVar;
                              console.log(serverVariable);  
                                }).catch(error => console.error('Error fetching server variable:', error));
    }

form.addEventListener("submit", handleLink);
