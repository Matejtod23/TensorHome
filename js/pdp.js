// Generating product info
let data2 = "{\"pageNumber\":1,\"pageSize\":15}"
let fetchedData

fetch("http://prendjovp-001-site1.atempurl.com/lookup/items/list", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: data2
})
    .then(response => response.text())
    .then(data2 => {
        fetchedData = JSON.parse(data2)
        generateData(fetchedData)
    })
    .catch((error) => {
        console.error('Error:', error);
    });

//generate data on website
function generateData(data){

    const product = JSON.parse(localStorage.getItem('product'))


    let imagesFromData = product.images
    console.log(imagesFromData)
    //bigImage
    // const bigImage = document.createElement('img')
    // bigImage.src = imagesFromData[0].link
    // bigImage.classList.add("mx-0")
    document.getElementById("bigImagetag").src = imagesFromData[0].imageUrl

    //smallImages
    console.log(imagesFromData.length)
    for (let i = 0; i < imagesFromData.length; i++){
        const smallImgContainer = document.createElement('div')
        const smallImg = document.createElement('img')
        smallImg.classList.add("images")
        smallImg.style.objectFit = "contain"
        smallImg.src = product.images[i].imageUrl
        smallImgContainer.appendChild(smallImg)
        document.getElementById("smallImages").appendChild(smallImgContainer)
    }
    document.querySelector("#price").innerText = product.price
    document.querySelector(".card-header").innerText = product.name

    const largeImage = document.querySelector('#bigImage img');

// Get all the thumbnail images
    const thumbnailImages = document.querySelectorAll('.images');

// Add a click event listener to each thumbnail image
    thumbnailImages.forEach(thumbnailImage => {
        thumbnailImage.addEventListener('click', () => {
            // Set the large image source to the clicked thumbnail image source
            largeImage.setAttribute('src', thumbnailImage.getAttribute('src'));

            // Remove the active class from all thumbnail images
            thumbnailImages.forEach(thumbnailImage => {
                thumbnailImage.classList.remove('active');
            });

            // Add the active class to the clicked thumbnail image
            thumbnailImage.classList.add('active');

            // Animate the large image
            largeImage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                largeImage.style.transform = 'scale(1)';
            }, 500);
        });
    });
}
function transition(){
    let checked = document.getElementById("sidebar-btn")
    checked = checked.ariaChecked
    if (checked === "false"){
        document.getElementById("sidebar").style.right = "0"
        document.getElementById("sidebar-btn").ariaChecked = "true"
    }else {
        document.getElementById("sidebar").style.right = "-250px"
        document.getElementById("sidebar-btn").ariaChecked = "false"
    }
}



document.addEventListener("DOMContentLoaded", function() {
    var navbarToggler = document.querySelector(".navbar-toggler");
    var navbarNav = document.querySelector("#navbarNav");
    navbarToggler.addEventListener("click", function() {
        navbarNav.classList.toggle("show");
    });
});










