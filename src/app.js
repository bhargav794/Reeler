const form = document.myForm;
const inpLink = document.querySelector(".userLink");
let link;
//console.log({form, inpLink});


function handleLink(e) {
    e.preventDefault();
    link = inpLink.value;
    console.log(e, link);

    // TODO: get the reel from api with the link retrieved.
    

    this.reset();
}


form.addEventListener('submit', handleLink);