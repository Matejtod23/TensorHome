//Nav bar
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
//Category List
const categoryButton = document.querySelector(".categoryButton");
const categoryList = document.querySelector(".categoryList");

categoryButton.addEventListener("click", function () {
    if (categoryList.style.display === "none"){
        categoryList.style.display = "flex";
    }else {
        categoryList.style.display = "none"
    }
});

const categoryLinks = document.getElementsByClassName("categoryLinks")

for (var i = 0; i < categoryLinks.length ; i++){
    const link = categoryLinks.item(i)
    link.addEventListener("click", function () {
        const parent = link.parentNode
        if (parent.childElementCount > 1){
            if (parent.lastElementChild.style.display === "none") {
                parent.lastElementChild.style.display = "flex"
            } else {
                parent.lastElementChild.style.display = "none"
            }
        }
    })
}