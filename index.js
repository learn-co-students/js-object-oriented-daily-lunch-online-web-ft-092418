// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
  constructor(name){
    this.name = name
    this.id = store.neighborhoods.length + 1
    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    )
  }

  customers(){
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id
      }.bind(this)
    )
  }

  mealsUnique(meals){
    return meals.filter(function(item, index){ return meals.indexOf(item) >= index})
  }

  meals(){
    let temp = this.customers().map(customer => {return customer.meals()})
    console.log(temp)
    return this.mealsUnique(temp[0])
  }

}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = store.customers.length + 1
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {if (delivery.customer().id === this.id) return delivery })
  }

  meals(){
    const deliveries = this.deliveries()
    return deliveries.map(delivery => {return delivery.meal()})
  }

  totalSpent(){
     let total = 0
     this.meals().forEach(meal => total += meal.price)
     return total
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = store.meals.length + 1
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {if (delivery.meal().id === this.id) return delivery })
  }

  customers(){
    const deliveries = this.deliveries()
    return deliveries.map(delivery => {return delivery.customer()})
  }

  static byPrice(){
    return store.meals.sort(function(meal, meal2) {return meal2.price - meal.price})
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = store.deliveries.length + 1
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find( meal => {
      if (meal.id === this.mealId){
        return meal
      }
    })
  }

  customer(){
    return store.customers.find( customer => {
      if (customer.id === this.customerId) {
        return customer
      }
    })
  }

  neighborhood(){
    return store.neighborhoods.find( neighborhood => {
      if (neighborhood.id === this.neighborhoodId) {
        return neighborhood
      }
    })
  }
}
