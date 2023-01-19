var count_items_in_page = 10;

var p = 0;
var cat = 'All';
var count_ps = 0;


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

    var modal_container = document.getElementById('modal-container'); 
    var modal = document.createElement("div");
    modal.className ="modal";
    modal.innerHTML = '<div class="product-info">'+
                            '<h1>' + data[0].title + '</h1>' +
                            '<h2>' + data[0].category + '</h2>' +
                        '</div>' +
                        '<div class="product-middle">'+
                            '<div class="img-container"><img src="' + data[0].image + '"></div>' +
                            '<p>' + data[0].description + '</p>' +
                        '</div>'+
                        '<div class="product-info">'+
                            '<span class="price">' + "$" + data[0].price + '</span>'+
                            '<span class="rate">' + data[0].rating.rate + '</span>' +
                            '<span class="rate">' + data[0].rating.count + '</span>' +
                            '<a href="" class="button">В корзину</a>' +
                        '</div>';
    modal_container.appendChild(modal);
}

function append_item (item, cont)
{
    var div = document.createElement("div");
    div.className = "product";
    div.id = item.id;
    div.innerHTML = 
                        '<div class="product-info">'+
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



var prod;

fetch('https://fakestoreapi.com/products/')
    .then(response => response.json())
    .then(function (data) {
        //calc_count_pages();
        prod = data;
        appendData(data);
        calc_count_pages();
    })
    .then(appendPages)
    .catch(function (err) {
        console.log('error: ' + err);
    })

var cate;

fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(function (categories) {
        //calc_count_pages();
        cate = categories;
        appendCat(categories);
        calc_count_pages();
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })

function appendPages()
{
    //var count_pages = Math.ceil(prod.length / 10);
    var pages = document.getElementById('pages');  
    var pages_container = document.getElementById('pages_container');
    pages_container.parentNode.removeChild(pages_container);
    var ul = document.createElement("ul");
    ul.id = 'pages_container';
    console.log('appendPages = ' + count_ps);
    for(var i=0; i < count_ps; i++)
    {
        ul.innerHTML += '<li><a class = "q" id="' + (i).toString() +  '">' + (i+1).toString() + '</a></li>';
        pages.appendChild(ul);
    }
}

function itemsOutput(){
    p = this.id;
    f()
}

$(document).on("click", "a", itemsOutput);

$(document).ready(function(){
    $("a").trigger("click");
});

function f ()
{
    //var el = document.getElementById("select");
    var product_container = document.getElementById('products');
    var products_container = document.createElement("div");

    //console.log(product_container)

    product_container.parentNode.removeChild(product_container);
    products_container.id = "products";
    document.body.appendChild(products_container);
    //appendPages();
    
    //var idx_page = 0;
    
    var start = p * count_items_in_page;
    var finish = start + count_items_in_page;

    var i_p = 0;
    for(var i = 0; i < prod.length; i++)
    {
        if(cat == 'All')
        {
            if(i_p >= start && i_p < finish)
            {
                append_item(prod[i], products_container);
            }
            i_p++;
        }
        else
        {
            var cate_now = prod[i].category;
            if(cate_now == cat)
            {
                if(i_p >= start && i_p < finish)
                {
                    append_item(prod[i], products_container);
                }
                i_p++;
            }
        }
    }
}

function calc_count_pages()
{
    if(cat == 'All')
    {
        count_ps = prod.length;
    }
    else
    {
        count_ps = 0;
        for(var i = 0; i < prod.length; i++)
        {
            var cate_now = prod[i].category;
            if(cate_now == cat)
            {
                count_ps++;
            }
        }
    }
    count_ps = Math.ceil(count_ps / count_items_in_page);
}

document.addEventListener('DOMContentLoaded', function ()
{

    var el = document.getElementById("select");
    el.onchange = function ()
    {
        cat = el.value
        p = 0

        calc_count_pages()
        appendPages()

        console.log(count_ps)

        f()
    }
    
});

