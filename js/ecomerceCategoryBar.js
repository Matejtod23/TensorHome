//Fetching data
let categoryData
let data
fetch("https://prendjovp-001-site1.atempurl.com/lookup/categories/landing/page/list", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    // body: ""
})
    .then(response => response.text())
    .then(data2 => {
        categoryData = JSON.parse(data2)
        generateCategoryBar(categoryData)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
//creating function for categoryBar
function generateCategoryBar(data){
    const categories = Array.from(data)
    categories.forEach(function (category) {
        const listItem = document.createElement("li")
        // link
        const link = document.createElement("a")
        link.classList.add("categoryLinks")
        link.id = category.categoryId
        link.innerHTML = category.category
        link.addEventListener('dblclick', () => {
            var link = "ecomerce.html?id=" + category.categoryId
            localStorage.setItem('categoryId',category.categoryId);
            window.location.href = link
        })
        // adding the link to list item
        listItem.appendChild(link)


        // if subCategories present
        const subCategory = Array.from(category.subCategories)
        if (subCategory. length > 0)
        {
            const subList = document.createElement("ul")
            subList.classList.add("subcategory")
            subList.style.display = "none"
            subCategory.forEach(function (sub) {
                //listItem
                const subItem = document.createElement("li")
                //  link
                const subLink = document.createElement("a")
                subLink.innerHTML = sub.subCategory
                subLink.id = sub.subCategoryId
                subLink.style.cursor = "pointer"
                subLink.addEventListener('click', () => {
                    var link = "ecomerce.html?id=" + category.categoryId
                    localStorage.setItem('categoryId',sub.subCategoryId + " sub");
                    window.location.href = link
                })
                //  adding them
                subItem.appendChild(subLink)
                //  to the list
                subList.appendChild(subItem)
            })
            listItem.appendChild(subList)
        }
        // adding the list item to the list
        document.querySelector(".categoryList").appendChild(listItem)
    })
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
}