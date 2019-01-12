// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let mealId = 0; let deliveryId = 0; let customerId = 0; let neighborhoodId = 0;


class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {return delivery.mealId === this.id}.bind(this))
  }
  customers() {
    const deliveries = this.deliveries();
    const customerIds = deliveries.map(function(delivery) {return delivery.customerId});
    return store.customers.filter(function(customer) {return this.includes(customer.id)}.bind(customerIds))
  }
  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price;
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    store.deliveries.push(this);
  }
  meal () {
    return store.meals.find(function(meal) {return meal.id === this.mealId}.bind(this));
  }
  customer() {
    return store.customers.find(function(customer) {
      return customer.id == this.customerId}.bind(this))
  }
  neighborhood() {
    return store.neighborhoods.find(function(neighborhood) {return neighborhood.id === this.neighborhoodId}.bind(this));
  }
}

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {return delivery.customerId === this.id}.bind(this));
  }
  meals() {
    const deliveries = this.deliveries();
    const mealIds = deliveries.map(function(delivery) {return delivery.mealId});
    let mealId;
    return mealIds.map(function(mealId) {return store.meals.find(function(meal) {return meal.id === this}.bind(mealId))})
   }
   totalSpent() {
     let total = 0;
     let meals = this.meals();
     let meal;
     for (meal in meals){
       total += meals[meal].price;
     }
     return total;
   }
}

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(function(delivery) {return delivery.neighborhoodId == this.id}.bind(this));
  }
  customers() {
    return store.customers.filter(function(customer) {
      return customer.neighborhoodId == this.id}.bind(this));
  }
  meals() {
    const deliveries = store.deliveries.filter(function(delivery) {return delivery.neighborhoodId === this.id}.bind(this))
    const mealIds = deliveries.map(function(delivery) {return delivery.mealId})
    const meals = store.meals.filter(function(meal) {return this.includes(meal.id)}.bind(mealIds))
    return meals;
  }
}
