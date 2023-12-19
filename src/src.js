
const form = document.myForm;
const inpLink = document.querySelector(".userLink");

const downloadLink = document.querySelector(".downloadLink");
const imgLink = document.querySelector(".thumbImg");
const contDiv = document.querySelector(".video-download");
const errElem = document.querySelector(".errors");

let link;

async function handleLink(e) {
  try {
    e.preventDefault();
    link = inpLink.value;
    // TODO  validatate instagram URL with errors.
    if (!link.includes("instagram")) {
      alert("Only instagram links are supported");
      this.reset();
      return;
    }
    await updateURL(link);
    this.reset();
  } catch (err) {
    console.error(err);
  }
}

async function updateURL(oriLink) {
  try {
    const response = await fetch("/setUrl", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ newURL: oriLink }),
    })
    .then(respo => {
      return respo.json();
    })
    .then(data => {
      const fD = data.downloadLink;
      const tB = data.imgLink;
      if(fD != null || tB != null) {
        getDURL(fD, tB);
      }
      else{
        throw new Error("Something went wrong please try again");
      }
    })
  } catch (err) {
    errElem.innerHTML = `${err}`;
    errElem.style.display = "block";
    contDiv.style.display = "none";
    console.error(err); //make this an error visible to user.
  }
}

async function getDURL(dLink, iLink) {
      imgLink.src = `${iLink}`;
      downloadLink.href = `${dLink}`;
      errElem.style.display = "none";
      contDiv.style.display = "flex";
    }

form.addEventListener("submit", handleLink);


