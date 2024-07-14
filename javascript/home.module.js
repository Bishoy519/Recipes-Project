import { Ui } from "./ui.module.js";
const searchLi = document.querySelector("#search");
const catLi = document.querySelector("#cat");
const areaLi = document.querySelector("#area");
const indLi = document.querySelector("#ind");
const contLi = document.querySelector("#cont");
const wordSearch = document.querySelector(".input1");
const letterSearch = document.querySelector(".input2");
const subBtn = document.querySelector("#submit");
// const nameInput = document.querySelector("#nameInput");
// const emailInput = document.querySelector("#emailInput");
// const phoneInput = document.querySelector("#phoneInput");
// const ageInput = document.querySelector("#ageInput");
// const passInput1 = document.querySelector("#passInput1");
// const passInput2 = document.querySelector("#passInput2");
// const nameAlert = document.querySelector("#nameAlert");
// const emailAlert = document.querySelector("#emailAlert");
// const phoneAlert = document.querySelector("#phoneAlert");
// const ageAlert = document.querySelector("#ageAlert");
// const passAlert1 = document.querySelector("#passAlert1");
// const passAlert2 = document.querySelector("#passAlert2");

export class Home {
    constructor() {


        this.ui = new Ui();
        this.ui.readyDoc()
        this.ui.displaySidebar();
        this.ui.searchbar();
        this.ui.closesidebar()
        this.callitems();
        this.SearchWord()
        this.Searchletter()
        this.initializeEventListeners();
        this.initializeEventListenersCat();
        this.initializeEventListenersIng();
        this.initializeEventListenersArea();
        this.nameInput = document.querySelector("#nameInput");
        this.emailInput = document.querySelector("#emailInput");
        this.phoneInput = document.querySelector("#phoneInput");
        this.ageInput = document.querySelector("#ageInput");
        this.passInput1 = document.querySelector("#passInput1");
        this.passInput2 = document.querySelector("#passInput2");
        this.nameAlert = document.querySelector("#nameAlert");
        this.emailAlert = document.querySelector("#emailAlert");
        this.phoneAlert = document.querySelector("#phoneAlert");
        this.ageAlert = document.querySelector("#ageAlert");
        this.passAlert1 = document.querySelector("#passAlert1");
        this.passAlert2 = document.querySelector("#passAlert2");
        this.subBtn = document.querySelector("#submit");


        contLi.addEventListener("click", () => {
            $("main").addClass("d-none");
            $(".Form").removeClass("d-none");
            this.ui.closesidebar()

        })
        catLi.addEventListener("click", async () => {
            $("main").removeClass("d-none");
            $(".Form").addClass("d-none");
            this.ui.closesidebar()
            let x = await this.getmealBycategory();
            this.ui.displayCat(x);
        })
        areaLi.addEventListener("click", async () => {
            $("main").removeClass("d-none");
            $(".Form").addClass("d-none");
            this.ui.closesidebar()
            let x = await this.getmealByarea();
            this.ui.displayarea(x);
        })
        indLi.addEventListener("click", async () => {
            $("main").removeClass("d-none");
            $(".Form").addClass("d-none");
            this.ui.closesidebar()
            let x = await this.getmealByingredients();
            this.ui.displayind(x);
        })
   

        this.nameInput.addEventListener("input", () => {
            this.regName();
            this.checkFormValidity();

        });

        this.emailInput.addEventListener("input", () => {
            this.regEmail();
            this.checkFormValidity();

        });

        this.phoneInput.addEventListener("input", () => {
            this.regNumber();
            this.checkFormValidity();

        });

        this.ageInput.addEventListener("input", () => {
            this.regAge();
            this.checkFormValidity();

        });

        this.passInput1.addEventListener("input", () => {
            this.regPass1();
            this.checkFormValidity();

        });

        this.passInput2.addEventListener("input", () => {
            this.regPass2();
            this.checkFormValidity();

        });

        // subBtn.addEventListener("click", (e) => {
        //     e.preventDefault();

        // });
    }

    // ////////////////////////////////
    // add event on meals ////////////

    async SearchWord() {
        wordSearch.addEventListener("change", async (e) => {
            this.ui.closesidebar()
            this.getmealByname(e.target.value);
        })
    }
    async Searchletter() {
        letterSearch.addEventListener("change", async (e) => {
            this.getmealByletter(e.target.value);

        })
    }
    ////////////////////////////
    async initializeEventListeners() {
        document.querySelector('#holder').addEventListener('click', async (e) => {
            if (e.target.closest('.cards')) {
                this.getinfo();
            }
        });
    }
    getinfo() {
        let elements = document.querySelectorAll(".cards")
        elements.forEach(link => {
            link.addEventListener("click", (e) => {
                let target = e.target.closest('.hsbcqnb');
                e.stopPropagation();
                let mealName = target.querySelector('h3').textContent;
                this.getmeal(mealName);

            })
        })
    }
    // Category Meals calling ///////////////////
    async initializeEventListenersCat() {
        document.querySelector('#holder').addEventListener('click', async (e) => {
            if (e.target.closest('.catCards')) {
                this.getCatinfo();
            }
        });
    }
    getCatinfo() {
        let elements = document.querySelectorAll(".catCards")
        elements.forEach(link => {
            link.addEventListener("click", (e) => {
                let target = e.target.closest('.category');
                e.stopPropagation();
                let mealName = target.querySelector('h3').textContent;
                console.log(mealName);
                this.getCatMeals(mealName);
            })
        })
    }
    // Area Meals calling ///////////////////
    async initializeEventListenersArea() {
        document.querySelector('#holder').addEventListener('click', async (e) => {
            if (e.target.closest('.areaCards')) {
                this.getAreainfo();
            }
        });
    }
    getAreainfo() {
        let elements = document.querySelectorAll(".areaCards")
        elements.forEach(link => {
            link.addEventListener("click", (e) => {
                let target = e.target.closest('.area');
                e.stopPropagation();
                let mealName = target.querySelector('h3').textContent;
                console.log(mealName);
                this.getAreaMeals(mealName);
            })
        })
    }
    // ingrediant Meals calling ///////////////////
    async initializeEventListenersIng() {
        document.querySelector('#holder').addEventListener('click', async (e) => {
            if (e.target.closest('.ingCards')) {
                this.getInginfo();
            }
        });
    }
    getInginfo() {
        let elements = document.querySelectorAll(".ingCards")
        elements.forEach(link => {
            link.addEventListener("click", (e) => {
                let target = e.target.closest('.ingred');
                e.stopPropagation();
                let mealName = target.querySelector('h3').textContent;
                console.log(mealName);
                this.getIngMeals(mealName);
            })
        })
    }
    // Call APIS//////////////////////////////////////////////////
    async callitems() {
        this.ui.loaderIn()
        const allitems = await this.getmeal("")
        this.ui.displayItems(allitems.slice(0, 20));
        this.ui.loaderOut()
    }
    async getmeal(mealname) {
        this.ui.loaderIn()
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`);
        const response = await apiMeal.json();
        this.ui.displayCardDetails(response.meals[0])
        this.ui.loaderOut()
        return response.meals;
    }
    //////////////////////////////////////////////////

    async getmealByname(mealname) {
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`);
        const response = await apiMeal.json();
        this.ui.displayItems(response.meals.slice(0, 20));
        return response.meals;
    }
    async getmealByletter(mealname) {
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealname}`);
        const response = await apiMeal.json();
        this.ui.displayItems(response.meals.slice(0, 20));
        return response.meals;
    }
    //////////////////////////////////////////////////

    async getmealBycategory() {
        this.ui.loaderIn()
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const response = await apiMeal.json();
        this.ui.loaderOut()
        return response.categories.slice(0, 20);
    }

    async getCatMeals(cat) {
        this.ui.loaderIn()
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        const response = await apiMeal.json();
        this.ui.displayItems(response.meals.slice(0, 20));
        this.ui.loaderOut()
        return response.meals
    }
    //////////////////////////////////////////////////

    async getmealByarea() {
        this.ui.loaderIn()
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const response = await apiMeal.json();
        this.ui.loaderOut()
        return response.meals.slice(0, 20);
    }
    async getAreaMeals(area) {
        this.ui.loaderIn()
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const response = await apiMeal.json();
        this.ui.displayItems(response.meals.slice(0, 20));
        this.ui.loaderOut()
        return response.meals;
    }
    //////////////////////////////////////////////////

    async getmealByingredients() {
        this.ui.loaderIn()
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const response = await apiMeal.json();
        this.ui.loaderOut()
        return response.meals.slice(0, 20);
    }
    async getIngMeals(ing) {
        this.ui.loaderIn()
        const apiMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
        const response = await apiMeal.json();
        this.ui.displayItems(response.meals.slice(0, 20));
        this.ui.loaderOut()
        return response.meals;
    }



    regName() {
        let nameRgx = /^[a-zA-Z ]+$/;
        if (nameRgx.test(nameInput.value)) {
            nameAlert.classList.add("d-none");
            return true;
        } else {
            nameAlert.classList.remove("d-none");
            return false;
        }
    }
    regName() {
        let nameRgx = /^[a-z]{3,15}$/;
        if (nameRgx.test(nameInput.value)) {
            this.nameAlert.classList.add("d-none");
            return true;
        } else {
            this.nameAlert.classList.remove("d-none");
            return false;
        }
    }

    regEmail() {
        let emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRgx.test(emailInput.value)) {
            this.emailAlert.classList.add("d-none");
            return true;
        } else {
            this.emailAlert.classList.remove("d-none");
            return false;
        }
    }

    regNumber() {
        let numberRgx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (numberRgx.test(phoneInput.value)) {
            this.phoneAlert.classList.add("d-none");
            return true;
        } else {
            this.phoneAlert.classList.remove("d-none");
            return false;
        }
    }

    regAge() {
        let ageRgx = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
        if (ageRgx.test(ageInput.value)) {
            ageAlert.classList.add("d-none");
            return true;
        } else {
            ageAlert.classList.remove("d-none");
            return false;
        }
    }

    regPass1() {
        let passRgx = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        if (passRgx.test(passInput1.value)) {
            passAlert1.classList.add("d-none");
            return true;
        } else {
            passAlert1.classList.remove("d-none");
            return false;
        }
    }

    regPass2() {
        let passRgx = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        if (passRgx.test(passInput2.value) && passInput1.value == passInput2.value) {
            passAlert2.classList.add("d-none");
            return true;
        } else {
            passAlert2.classList.remove("d-none");
            return false;
        }
    }

    checkFormValidity() {
        if (
            this.regName() &&
            this.regEmail() &&
            this.regNumber() &&
            this.regAge() &&
            this.regPass1() &&
            this.regPass2()
        ) {
            this.subBtn.classList.remove("disabled");
        } else {
            this.subBtn.classList.add("disabled");
        }
    }
}

