// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


//this is used for Neighborhood meals() function - ie   campHill.meals()
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
}




let neighborhoodId = 0
class Neighborhood {
    constructor(name){
        this.name = name
        this.id = neighborhoodId++
        store.neighborhoods.push(this)
    }

    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId === this.id
        })
    }

    customers(){
        return store.customers.filter (customer => {
            return customer.neighborhoodId === this.id
        })
    }

    meals(){
        let newArr = this.deliveries().map(delivery => {
            return delivery.meal()
        })

        

        return newArr.filter( onlyUnique )
    }
}


let customerId = 0
class Customer {
    constructor(name, neighborhoodId){
        this.name = name 
        this.neighborhoodId = neighborhoodId
        this.id = customerId++
        store.customers.push(this)
    }

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id
        })
    }

    meals() {
        return this.deliveries().map(delivery => {
            return delivery.meal()
        })
    }

    totalSpent() {
        let total = 0

        const reduceMealPrice = function (agg, el, i, arr){
            return agg + el.price
        }

        return this.meals().reduce(reduceMealPrice, 0)
    }
}

let mealId = 0
class Meal {
    constructor(title, price) {
        this.title = title
        this.price = price
        this.id = mealId++
        store.meals.push(this)
    }

    deliveries() {
        return store.deliveries.filter (delivery => {
            return delivery.mealId === this.id
        })
    }

    customers() {
        return this.deliveries().map(delivery => {
            return delivery.customer()
        })
    }

    static byPrice() {
        console.log(store.meals)
        return store.meals.sort(function(a, b){
            return b.price - a.price
        })
    }
}

let deliveryId = 0
class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        this.id = deliveryId++
        store.deliveries.push(this)
    }

    meal(){
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }

    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId
        })
    }

    customer() {
        return store.customers.find(customer => {
            return customer.id === this.customerId
        })
    }
    
}