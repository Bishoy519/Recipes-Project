export class Ui {
    constructor() {

    }

    // main display cards
    displayItems(data) {
        let bBox = ``;
        for (let i = 0; i < data.length; i++) {
            bBox += ` <div class="col-md-3 position-relative overflow-hidden hsbcqnb cards">
                    <div class="inner position-relative rounded-4 overflow-hidden " data-cat="${data[i].strMeal}" >
                        <img src="${data[i].strMealThumb}" class="w-100" alt="">
                        <div class="layer w-100 d-flex justify-content-between align-items-center">
                            <h3 class="text-black ms-2">${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
        }
        document.getElementById("holder").innerHTML = bBox;
    }
    // display Categories
    displayCat(data) {
        let bBox = ``;
        for (let i = 0; i < data.length; i++) {
            bBox += ` <div class="col-md-3  position-relative overflow-hidden category catCards" data-cat="${data[i].strCategory}" >
                    <div class="inner position-relative rounded-4 overflow-hidden" >
                        <img src="${data[i].strCategoryThumb}" class="w-100" alt="">
                        <div class="layer w-100 d-flex justify-content-between align-items-center flex-column p-3">
                            <h3 class="text-black ">${data[i].strCategory}</h3>
                            <p class="text-black ">${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
                </div>`
        }
        document.getElementById("holder").innerHTML = bBox;
    }
    // display Area
    displayarea(data) {
        let bBox = ``;
        for (let i = 0; i < data.length; i++) {
            bBox += ` <div class="col-md-3 p-4 area areaCards" data-cat="${data[i].strArea}">
                <div class="rounded-2 text-center cursor-pointer d-flex align-items-center justify-content-center flex-column" >
                        <i class="fa-solid fa-house-flag fa-6x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>`
        }
        document.getElementById("holder").innerHTML = bBox;
    }
    // display Ingredients
    displayind(data) {
        let bBox = ``;

        for (let i = 0; i < data.length; i++) {
            let description = data[i].strDescription ? data[i].strDescription.split(" ").slice(0, 20).join(" ") : "No description available.";
            bBox += ` <div class="col-md-3 p-4 ingred ingCards">
            <div class="rounded-2 text-center cursor-pointer d-flex align-items-center justify-content-center flex-column"  data-cat="${data[i].strIngredient}">
            <i class="fa-solid fa-house-flag fa-6x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>${description}</p>
            </div>
            </div>`
        }
        document.getElementById("holder").innerHTML = bBox;
    }

    readyDoc() {
        $(document).ready(() => {
            $(".loader").fadeOut(500, () => {
                $(".loading").slideUp(500, () => {
                    $("body").css({ overflow: "auto" })

                });
            });
        });
    }
    loaderIn() {
        $(".loader").fadeIn(10, () => {
            $(".loading").fadeIn(300, () => {
                $("body").css({ overflow: "hidden" })

            });
        });
    }
    loaderOut() {
        $(".loader").fadeOut(300, () => {
            $(".loading").fadeOut(300, () => {
                $("body").css({ overflow: "auto" })

            });
        });
    }
    // display on input
    searchbar() {
        $("#search").on("click", () => {
            $("#hsbc").toggleClass('d-none');
            $("main").removeClass("d-none");
            $(".Form").addClass("d-none");

            this.closesidebar()
        })
    }
    displayCardDetails(data) {
        let ingredients = ``

        for (let i = 1; i <= 20; i++) {
            if (data[`strIngredient${i}`]) {
                ingredients += `<li id="recipes" class="bg-info fw-light text-black rounded-3 px-2 py-1 my-0">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
            }
        }

        let tags = data.strTags?.split(",")
        if (!tags) tags = ["No Tags"]
        let tagsStr = ''
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `<li class="alert alert-danger fw-light text-white rounded-3 px-2 py-1 my-0">${tags[i]}</li>`
        }

        let bBox =
            `    <div class="col-12 col-md-4">
                    <div class="details-img">
                        <img class="w-100" src="${data.strMealThumb}" alt="">
                    </div>
                    <h1>${data.strMeal}</h1>

                </div>
                <div class="col-12 col-md-8">
                    <h3 class="fw-bold">Instructions</h3>
                    <p>${data.strInstructions}</p>
                    <h3 class="fw-bold">Area :<span>${data.strArea}</span></h3>
                    <h3 class="fw-bold">Category : <span>${data.strCategory}</span></h3>
                    <h3 class="fw-bold">Recipes :</h3>
                    <ul class="d-flex flex-wrap gap-3">
                        ${ingredients}
                    </ul>
                    <h3  >Tags :</h3>
                    <ul class="d-flex gap-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <div class="mt-5 mb-5">
                        <button type="button" class="btn btn-danger btn-lg px-3 py-2"> <a href="${data.strYoutube}" target="_blank">YouTube</a></button>
                        <button type="button" class="btn btn-success btn-lg px-3 py-2"> <a href="${data.strSource}" target="_blank">Web Site</a></button>

                    </div>
                </div>`

        document.getElementById("holder").innerHTML = bBox;
    }
    // display sidebar
    displaySidebar() {
        let keys = $("#mainly").innerWidth();
        if (keys == $("#mainly").innerWidth()) {
            $("#sidebar").animate({ left: `-${$("#mainly").innerWidth()}px` })
        }

        $(".fa-bars").on("click", function () {
            $("#sidebar").animate({ left: `0px` }, 500)
            $(".fa-xmark").removeClass('d-none');
            $(".fa-bars").addClass('d-none');
        })

        $(".fa-xmark").on("click", function () {
            $("#sidebar").animate({ left: `-${$("#mainly").innerWidth()}px` }, 500)
            $(".fa-bars").removeClass('d-none');
            $(".fa-xmark").addClass('d-none');
        })
    }
    // display sidebar
    closesidebar() {
        $("#sidebar").animate({ left: `-${$("#mainly").innerWidth()}px` }, 500)
        $(".fa-bars").removeClass('d-none');
        $(".fa-xmark").addClass('d-none');
    }

}

