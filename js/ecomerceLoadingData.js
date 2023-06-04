
const categoryIDs = localStorage.getItem("categoryId")
let data2
let fetchedData
const id = categoryIDs.split(" ")[0]
let pageNum = 2
let totalPages
if (categoryIDs.includes("sub"))
{
    data2 = "{\"pageNumber\":1,\"pageSize\":9,\"subCategoryId\":\""+id+"\"}"
}
else {
    data2 = "{\"pageNumber\":1,\"pageSize\":9,\"sortColumn\":\"name\",\"sortDirection\":\"asc\",\"categoryId\":\""+id+"\",\"subCategoryId\":\"\"}"
}
fetchDataFromApi(data2)

//Generating product info
function fetchDataFromApi(data2){
    fetch("https://crossorigin.me/http://prendjovp-001-site1.atempurl.com/furniture/datatable", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data2
    })
        .then(response => response.text())
        .then(data2 => {
            console.log(data2)
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
    const productsPerPage = 9
    let currentPage = 1
    // let currentCategory = 'all'
    function displayProducts(products) {
        // const startIndex = (page - 1) * productsPerPage;
        // const endIndex = startIndex + productsPerPage;
        document.querySelector(".productsSection").innerHTML = ""
        // container.innerHTML = '';

        for (let i = 0; i < 9; i++) {
                if (products[i]) {
                    const productBox = document.createElement('div')
                    productBox.classList.add("product-box")
                    const imageContainer = document.createElement('div')
                    imageContainer.style.maxWidth = "300px"
                    imageContainer.style.maxHeight = "300px"
                    imageContainer.style.margin = "0 auto"
                    const image = document.createElement('img')
                    image.src = products[i].images[0].imageUrl
                    image.classList.add("product-image")
                    imageContainer.appendChild(image)
                    productBox.appendChild(imageContainer)
                    const productText = document.createElement('div')
                    productText.classList.add("product-text")
                    const title = document.createElement('h2')
                    title.classList.add("product-title")
                    title.innerText = products[i].name
                    productText.appendChild(title)
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

// add event listeners for the previous and next buttons
    document.getElementById('previousPage').addEventListener('click', () => {
        pageNum--
        if (pageNum < 1)
        {
            pageNum = 1
        }
        if (categoryIDs.includes("sub"))
        {
            data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":9,\"subCategoryId\":\""+id+"\"}"
        }
        else {
            data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":9,\"sortColumn\":\"name\",\"sortDirection\":\"asc\",\"categoryId\":\""+id+"\",\"subCategoryId\":\"\"}"
        }
        window.scroll(top, 0)
        fetchDataFromApi(data2)
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        pageNum++
        if (pageNum > totalPages)
        {
            pageNum = totalPages
        }
        if (categoryIDs.includes("sub"))
        {
            data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":9,\"subCategoryId\":\""+id+"\"}"
        }
        else {
            data2 = "{\"pageNumber\":"+pageNum+",\"pageSize\":9,\"sortColumn\":\"name\",\"sortDirection\":\"asc\",\"categoryId\":\""+id+"\",\"subCategoryId\":\"\"}"
        }
        window.scroll(top, 0)
        fetchDataFromApi(data2)
    });

}
