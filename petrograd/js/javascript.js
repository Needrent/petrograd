// Loads the JS AFTER the DOM
document.addEventListener("DOMContentLoaded", function (event) {

    const tempDishes = document.querySelector("#tempDishes").content;
    const tempCat = document.querySelector("#tempCat").content;

    const starterCon = document.querySelector("#starterCon");
    const mainCon = document.querySelector("#mainCon");
    const dessertCon = document.querySelector("#dessertCon");
    const drinksCon = document.querySelector("#drinksCon");
    const sideordersCon = document.querySelector("#sideordersCon");

    const startersCat = document.querySelector("#startersCat");
    const mainCat = document.querySelector("#mainCat");
    const drinksCat = document.querySelector("#drinksCat");
    const sidesCat = document.querySelector("#sidesCat");
    const dessertCat = document.querySelector("#dessertCat");

    const productListLink = "http://kea-alt-del.dk/t5/api/productlist";
    const productImgLink = "https://kea-alt-del.dk/t5/site/imgs/";
    const productCatLink = "https://kea-alt-del.dk/t5/api/categories";

    const productLink = "https://kea-alt-del.dk/t5/api/product";

    // Category
    fetch(productCatLink).then(e => e.json()).then(dataCat => dataCat.forEach(showDataCat));

    function showDataCat(oneCat) {
        let clone = tempCat.cloneNode(true);
        clone.querySelector("h2").textContent = oneCat;
        clone.querySelector("img").src = "/petrograd/img/" + oneCat + "_cat_small.jpg";
        //clone.querySelector("source").srcset ="/petrograd/img/" + oneCat + "_cat_small.jpg";

        //console.log(oneCat);

        if (oneCat == "starter") {
            startersCat.appendChild(clone);
        }
        if (oneCat == "main") {
            mainCat.appendChild(clone);
        }
        if (oneCat == "dessert") {
            dessertCat.appendChild(clone);
        }
        if (oneCat == "drinks") {
            drinksCat.appendChild(clone);
        }
        if (oneCat == "sideorders") {
            sidesCat.appendChild(clone);
        }
    }

    //Product list
    fetch(productListLink).then(e => e.json()).then(data => data.forEach(showData));

    function showData(oneObject) {
        let clone = tempDishes.cloneNode(true);
        clone.querySelector("h3").textContent = oneObject.name;
        clone.querySelector(".pFull").textContent = oneObject.price + ",-";
        clone.querySelector("img").src = productImgLink + "medium/" + oneObject.image + "-md.jpg";
        clone.querySelector("img").alt = oneObject.image;
        clone.querySelector(".shortD").textContent = oneObject.shortdescription;

        if (oneObject.discount > 0) {
            // This changes the price
            clone.querySelector(".pFull").textContent = oneObject.price - oneObject.discount + ",-";
            //This shows the original price
            clone.querySelector(".pDiscount").textContent = "before " + oneObject.price + ",-";
            clone.querySelector(".pDiscount").classList.remove("hide");
        } else {
            clone.querySelector(".pFull").textContent = oneObject.price + ",-";
        }

        if (oneObject.soldout) {
            clone.querySelector(".soldOut").classList.remove("hide");
        }
        /* Same Code needed for Allergi*/
        if (oneObject.alcohol > 0) {
            //console.log(oneObject.name + " " + oneObject.category);
            const span = document.createElement("span");
            span.textContent = oneObject.alcohol + " % alcohol";
            clone.querySelector(".allergi").appendChild(span)
        }

        if (oneObject.vegetarian) {
            clone.querySelector(".vegi").classList.remove("hide");
        }

        /*Target Categories*/
        if (oneObject.category == "starter") {
            starterCon.appendChild(clone);
        }
        if (oneObject.category == "main") {
            mainCon.appendChild(clone);
        }
        if (oneObject.category == "dessert") {
            dessertCon.appendChild(clone);
        }
        if (oneObject.category == "drinks") {
            drinksCon.appendChild(clone);
        }
        if (oneObject.category == "sideorders") {
            sideordersCon.appendChild(clone);
        }
    }
});
