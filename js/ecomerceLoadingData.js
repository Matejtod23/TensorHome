
const categoryIDs = localStorage.getItem("categoryId")
let data2
let fetchedData
const id = categoryIDs.split(" ")[0]
let pageNum = 1
let totalPages
let pageSize

if (window.screen.width >= 1600)
{
    pageSize = 8
}else {
    pageSize = 6
}
if (categoryIDs.includes("sub"))
{
    data2 = "{\"pageNumber\":1,\"pageSize\":"+pageSize+",\"subCategoryId\":\""+id+"\"}"
}
else {
    data2 = "{\"pageNumber\":1,\"pageSize\":"+pageSize+",\"sortColumn\":\"name\",\"sortDirection\":\"asc\",\"categoryId\":\""+id+"\",\"subCategoryId\":\"\"}"
}
fetchDataFromApi(data2)

//Generating product info
function fetchDataFromApi(data2){
    fetch("https://prendjovp-001-site1.atempurl.com/furniture/datatable", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data2
    })
        .then(response => response.text())
        .then(data2 => {
            fetchedData = JSON.parse(data2)
            generateProducts(fetchedData)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function generateProducts(data){
    const products = data.data
    totalPages = data.totalPages
    const productsPerPage = pageSize
    let currentPage = 1
    // let currentCategory = 'all'
    function displayProducts(products) {
        // const startIndex = (page - 1) * productsPerPage;
        // const endIndex = startIndex + productsPerPage;
        document.querySelector(".productsSection").innerHTML = ""
        // container.innerHTML = '';

        for (let i = 0; i < pageSize; i++) {
                if (products[i]) {
                    // making card div
                    const productBox = document.createElement('div')
                    productBox.classList.add("product-box")
                    // making image and image container
                    const imageContainer = document.createElement('div')
                    imageContainer.classList.add("imageContainer")
                    imageContainer.style.maxWidth = "300px"
                    imageContainer.style.maxHeight = "300px"
                    imageContainer.style.margin = "0 auto"
                    const image = document.createElement('img')
                    image.src = products[i].images[0].imageUrl
                    image.classList.add("product-image")
                    imageContainer.appendChild(image)
                    productBox.appendChild(imageContainer)
                    //making horizontal line
                    const line = document.createElement('hr')
                    line.style.width = "100%"
                    line.style.color = "black"
                    productBox.appendChild(line)
                    // making product text
                    const productText = document.createElement('div')
                    productText.classList.add("product-text")
                    const title = document.createElement('h2')
                    title.classList.add("product-title")
                    title.innerText = products[i].name
                    productText.appendChild(title)
                    const productPrice = document.createElement('p')
                    productPrice.innerText = products[i].price + " денари"
                    productPrice.style.color = "#DD9776"
                    productPrice.style.fontWeight = "bold"
                    productText.appendChild(productPrice)
                    productBox.appendChild(productText)
                    productBox.addEventListener('click', () => {
                        var link = "../html/ProductPage.html?id=" + products[i].id
                        localStorage.setItem('product', JSON.stringify(products[i]))
                        window.open(link, "_blank");
                    })
                    document.querySelector(".productsSection").appendChild(productBox)
                }
        }
    }
// display the first page of products when the page loads
    displayProducts(products);

    document.getElementById("nextPage").addEventListener('click', nextPageHandler);
    document.getElementById("previousPage").addEventListener('click', previousPageHandler);

}
// add event listeners for the previous and next buttons// add event listeners for the previous and next buttons
function nextPageHandler() {
    pageNum++
    if (pageNum > totalPages)
    {
        pageNum = totalPages
    }
    if (categoryIDs.includes("sub"))
    {
        data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":"+pageSize+",\"subCategoryId\":\""+id+"\"}"
    }
    else {
        data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":"+pageSize+",\"sortColumn\":\"name\",\"sortDirection\":\"asc\",\"categoryId\":\""+id+"\",\"subCategoryId\":\"\"}"
    }
    window.scroll(top, 0)
    fetchDataFromApi(data2)
}

function previousPageHandler() {
    pageNum--
    if (pageNum < 1)
    {
        pageNum = 1
    }
    if (categoryIDs.includes("sub"))
    {
        data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":"+pageSize+",\"subCategoryId\":\""+id+"\"}"
    }
    else {
        data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":"+pageSize+",\"sortColumn\":\"name\",\"sortDirection\":\"asc\",\"categoryId\":\""+id+"\",\"subCategoryId\":\"\"}"
    }
    window.scroll(top, 0)
    fetchDataFromApi(data2)
}

