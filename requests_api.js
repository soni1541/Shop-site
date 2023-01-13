fetch('https://fakestoreapi.com/products/')
                .then(response => response.json())
                .then(function (data) {
                    appendData(data);
                })
                .catch(function (err) {
                    console.log('error: ' + err);
                })
                
function appendData(data) {
    var product_container = document.getElementById('products');        
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.className = "product";
        div.innerHTML =  '<div class="product-info">'+
                            '<h1>' + data[i].title + '</h1>' +
                            '<h2>' + data[i].category + '</h2>' +
                        '</div>' +
                        '<div class="img-container"><img src="' + data[i].image + '"></div>' +
                        '<div class="product-info">'+
                            '<span class="price">' + "$" + data[i].price + '</span>'+
                            '<span class="rate">' + data[i].rating.rate + '</span>' +
                            '<a href="" class="button">В корзину</a>' +
                        '</div>';
        product_container.appendChild(div);
    }
}

fetch('https://fakestoreapi.com/products/categories')
.then(response => response.json())
.then(function (categories) {
    appendCat(categories);
})
.catch(function (err) {
    console.log('error: ' + err);
})

function appendCat(categories) {
    var select_container = document.getElementById('select');    
    for (var i = 0; i < categories.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = categories[i];
        select_container.appendChild(option);
    }
}
