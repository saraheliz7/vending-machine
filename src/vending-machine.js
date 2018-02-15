function VendingMachine() {
    let credit = 0;
    let returnedCoins = [];
    let messages = [];

    let products = [
        {name: 'COLA', price: 1.00},
        {name: 'CHIPS', price: 0.50},
        {name: 'CANDY', price: 0.65}
    ];


    this.checkDisplay = () => {
        if(messages.length > 0) {
            let currentMessage = messages[0];
            messages.splice(0, 1);
            return currentMessage;
        } else if(credit === 0) {
            return 'INSERT COIN';
        } else {
            return "$" + credit.toFixed(2);
        }
    };

    this.insertCoin = (coin) => {
        if(coin === 'NICKLE') {
            credit += .05;
        } else if(coin === 'DIME') {
            credit += .10;
        } else if(coin === 'QUARTER') {
            credit += .25;
        } else {
            credit += 0;
            returnedCoins.push(coin);
        }
    };

    this.getReturnedCoins = () => {
        let currentReturnedCoins = returnedCoins;
        returnedCoins =[];
        return currentReturnedCoins;
    };

    this.displayProducts = () => {
        return [products[0].name, products[1].name, products[2].name];
    };

    this.selectProduct = (productIndex) => {
        let price = products[productIndex].price.toFixed(2);
        if(credit < products[productIndex].price) {
            messages.push('PRICE $' + price);
        } else if(credit === products[productIndex].price) {
            messages.push('THANK YOU');
            credit = 0;
        }
    };

}


module.exports = VendingMachine;