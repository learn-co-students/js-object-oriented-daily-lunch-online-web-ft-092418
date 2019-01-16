// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let deliveryId = 0 ;

class Delivery{
  constructor(mealId , neighborhoodId , customerId){
    this.id = ++deliveryId;
    this.mealId = mealId ;
    this.neighborhoodId = neighborhoodId ;
    this.customerId = customerId ;
    store.deliveries.push(this);
  }

  meal() {
  return store.meals.find(
      function(meal) {
          return meal.id === this.mealId;
      }.bind(this)
  );
}

customer() {
return store.customers.find(

    function(customer) {

        return customer.id === this.customerId;
    }.bind(this)
);
}


neighborhood() {
return store.neighborhoods.find(

    function(neighborhood) {

        return neighborhood.id === this.neighborhoodId;
    }.bind(this)
);
}

}





let mealId = 0;

class Meal {
  constructor(title , price){
    this.id = ++mealId;
    this.title = title ;
    this.price = price ;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.mealId === this.id;
        }.bind(this)
    );
  }

  customers(){
    return store.customers.filter(
        function(customer) {
            return customer.meals().includes(this);
        }.bind(this)
    );
  }

  static byPrice(){
    return store.meals.sort(function(meal1 , meal2){ return meal2.price - meal1.price })
  }
}


let neighborhoodId = 0;

class Neighborhood{
    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;

        // insert in the user to the store
        store.neighborhoods.push(this);
    }

    deliveries() {
    return store.deliveries.filter(
        function(delivery) {
            return delivery.neighborhoodId === this.id;
        }.bind(this)
    );
  }

  meals() {
  const allMeals =  this.deliveries().map(

      function(delivery) {
          return delivery.meal();
      }.bind(this)
  );

  return allMeals.filter(function(item, pos) {
    return allMeals.indexOf(item) == pos;
  });

}


  customers() {
  return store.customers.filter(
      function(customer) {
        // debugger;
          return customer.neighborhoodId === this.id ;
      }.bind(this)
  );
}

}



let customerId = 0;

class Customer{
    constructor(name , neighborhoodId) {
        this.id = ++customerId;
        this.name = name;
        this.neighborhoodId = neighborhoodId ;
        store.customers.push(this);
    }


    deliveries(){
      return store.deliveries.filter(
          function(delivery) {
              return delivery.customerId === this.id;
          }.bind(this)
      );
    }

    meals(){
      return this.deliveries().map(
          function(delivery) {
              return delivery.meal();
          }.bind(this)
      );
    }

    totalSpent(){
      let total = 0;
      const allMeals = this.meals();
      for (let ii = 0 ; ii< allMeals.length ; ii++){
        total +=allMeals[ii].price;
      }
      return total;
    };

  }
