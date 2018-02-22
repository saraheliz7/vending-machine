function VendingMachine() {
    let credit = 0;
    let returnedCoins = [];
    let messages = [];
    let change = 0;

    let products = [
        {name: 'COLA', price: 100},
        {name: 'CHIPS', price: 50},
        {name: 'CANDY', price: 65}
    ];

    this.checkDisplay = () => {
        if(messages.length > 0) {
            let currentMessage = messages[0];
            messages.splice(0, 1);
            return currentMessage;
        } else if(credit === 0) {
            return 'INSERT COIN';
        } else {
            let newCredit = credit / 100;
            return "$" + newCredit.toFixed(2);
        }
    };

    this.insertCoin = (coin) => {
        if(coin === 'NICKLE') {
            credit += 5;
        } else if(coin === 'DIME') {
            credit += 10;
        } else if(coin === 'QUARTER') {
            credit += 25;
        } else {
            credit += 0;
            returnedCoins.push(coin);
        }
    };

    this.getReturnedCoins = () => {
        if(change === 0) {
            let currentReturnedCoins = returnedCoins;
            returnedCoins =[];
            return currentReturnedCoins;
        } else {
            makeChange(change);
            change = 0;
            return returnedCoins;
        }

    };

    this.displayProducts = () => {
        return [products[0].name, products[1].name, products[2].name];
    };

    this.selectProduct = (productIndex) => {
        let price = (products[productIndex].price / 100).toFixed(2);
        if(credit < products[productIndex].price) {
            messages.push('PRICE $' + price);
        } else if(credit === products[productIndex].price) {
            messages.push('THANK YOU');
            credit = 0;
        } else if(credit > products[productIndex].price) {
            messages.push('THANK YOU');
            change = (credit - products[productIndex].price);
            credit = 0;
        }
    };

    let makeChange = (changeToMake) => {
        let dimes = Math.floor(changeToMake / 10);

        if(dimes) {
            returnedCoins.push('DIME');
        }

    };



}


module.exports = VendingMachine;