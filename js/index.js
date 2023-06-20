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

document.addEventListener("DOMContentLoaded", function () {
    var contactB = document.querySelector("#contactButton");
    contactB.addEventListener("click", function () {
        window.location.href = "../html/Contact.html"
    })
})