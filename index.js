// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId
        this.name = name

        store.neighborhoods.push(this)
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id 
            }.bind(this)
        )
    }

    customers() {
        return store.customers.filter(
            function(customer) {
                return customer.neighborhoodId === this.id
            }.bind(this))
    }

    meals() {
        function distinctMeals(value, index, self) {
            return self.indexOf(value) === index
          }
          
        return this.deliveries().map(d => d.meal()).filter(distinctMeals)
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.id = ++customerId
        this.name = name
        this.neighborhoodId = neighborhoodId

        store.customers.push(this)     
    }

    deliveries() {
        return store.deliveries.filter(d => {return d.customerId === this.id})
    }  

    meals() {
        return this.deliveries().map(d => {return d.meal()})
    }

    totalSpent() {
        return this.meals().reduce((total, meal) => {return total += meal.price}, 0)
    }
}

class Meal {
    constructor(title, price) {
        this.id = ++mealId
        this.title = title
        this.price = price

        store.meals.push(this)
    }

    deliveries() {
        return store.deliveries.filter(d => {return d.mealId === this.id})
    }

    customers() {
        return this.deliveries().map(d => {return d.customer()})
    }

    static byPrice() {
        return store.meals.sort((a,b) => {return b.price - a.price})
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId

        store.deliveries.push(this)
    } 

    meal() {
        return store.meals.find(meal => {return meal.id === this.mealId})
    }

    customer() {
        return store.customers.find(c => {return c.id === this.customerId})
    }

    neighborhood() {
        return store.neighborhoods.find(n => {return n.id === this.neighborhoodId})
    }
}