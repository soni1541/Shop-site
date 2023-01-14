
                
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

function append_item (item, cont)
{
    var div = document.createElement("div");
    div.className = "product";
    div.innerHTML =  '<div class="product-info">'+
                        '<h1>' + item.title + '</h1>' +
                        '<h2>' + item.category + '</h2>' +
                    '</div>' +
                    '<div class="img-container"><img src="' + item.image + '"></div>' +
                    '<div class="product-info">'+
                        '<span class="price">' + "$" + item.price + '</span>'+
                        '<span class="rate">' + item.rating.rate + '</span>' +
                        '<a href="" class="button">В корзину</a>' +
                    '</div>';
    cont.appendChild(div);
}


function appendCat(categories) {
    var select_container = document.getElementById('select');    
    for (var i = 0; i < categories.length; i++) {
        var option = document.createElement("option");
        option.value = categories[i];
        option.innerHTML = categories[i];
        select_container.appendChild(option);
    }
}

document.addEventListener('DOMContentLoaded', function ()
{
    var prod;

    fetch('https://fakestoreapi.com/products/')
    .then(response => response.json())
    .then(function (data) {
        prod = data;
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })

    var cate;

    fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(function (categories) {
        cate = categories;
        appendCat(categories);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })

    var el = document.getElementById("select");
    el.onchange = function ()
    {
        
        var product_container = document.getElementById('products');       
        product_container.parentNode.removeChild(product_container);
        var products_container = document.createElement("div");
        products_container.id = "products";
        document.body.appendChild(products_container);
        
        for(var i = 0; i < prod.length; i++)
        {
            if(el.value == 'All')
            {
                append_item(prod[i], products_container);
            }
            else
            {
                var cate_now = prod[i].category;

                if(cate_now == el.value)
                {
                    append_item(prod[i], products_container);
                }
            }
        }
    }
});
    
