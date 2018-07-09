angular.module('VendingMachineApp', [])
  .controller('VendingMachineController', function(ProductService, CoinService) {

    var vendingMachine = this;

    vendingMachine.products = ProductService.all();

    vendingMachine.coins = CoinService.all();

    vendingMachine.credit = 0.00;

    vendingMachine.addCoin = function(coin) {
      vendingMachine.credit += coin.value;
    };

    vendingMachine.checkoutProduct = function(product) {
        if(product.available == 0) {
	  alert('Product Not available');
        } else if(vendingMachine.credit < product.price) {
          var s = Number(product.price - vendingMachine.credit).toFixed(2);
          alert('you are ' + s +' short ');
        } else {
          product.available -= 1;
          vendingMachine.credit -= product.price;
          alert('you have successfully checked out ' + product.name + '. Enjoy.');
        }
    } ;

	vendingMachine.reset = function(){
            vendingMachine.products = ProductService.all();
            vendingMachine.coins = CoinService.all();
            vendingMachine.credit = 0.00;

       };
  })


.factory("CoinService", function() {
    var coins = [{id:1, name:'50 cent', value: 0.50}, {id:2, name:'1 Rand', value: 1.00},
{id:3, name:'2 Rand', value: 2.00}, {id:4, name:'5 Rand', value: 5.00}];

    return {
      all: function(){return coins;},
      first: function(){return coins[0];}
    };
  })

  .factory("ProductService", function(){
     var products = [{workItems: [{id:1, name:'Jungle Oats', price: 22.50, available: 2}, {id:2, name:'Bar One', price: 15.50, available: 12},
 {id:3, name:'Appletiser Juice', price: 12.50, available: 3}, {id:4, name:'Country Spread', price: 55.60, available: 6}, {id:5, name:'Jungle Oats', price: 22.50, available: 3}]},
 {workItems: [{id:1, name:'Fruitree Juice', price: 22.50, available: 3}, {id:2, name:'Bar One', price: 15.50, available: 3},
 {id:3, name:'Java Beans', price: 8.50, available: 20}, {id:4, name:'Red Hat Oats', price: 22.50, available: 3}, {id:5, name:'Lique Fruit Juice', price: 25.50, available: 3}]},
 {workItems: [{id:1, name:'Jungle Oats', price: 22.50, available: 3}, {id:2, name:'Lunch Bar Big', price: 15.50, available: 3},
 {id:3, name:'Appletiser Orange', price: 12.50, available: 3}, {id:4, name:'Jungle Oats', price: 22.50, available: 3}, {id:5, name:'Romany Creams Buscuits', price: 28.50, available: 4}]},
 {workItems: [{id:1, name:'Oracle Yummies', price: 22.50, available: 3}, {id:2, name:'Bar One', price: 15.50, available: 3},
 {id:3, name:'Jumbo Oats', price: 7.50, available: 3}, {id:4, name:'Coca Cola', price: 10.50, available: 3}, {id:5, name:'Tax Chocolate Bar', price: 22.50, available: 3}]}];

     return {
       all: function(){return products;},
       first: function(){return products[0];}
     };
   });
