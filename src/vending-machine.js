function VendingMachine(colaQuantity, chipsQuantity, candyQuantity,
                        quarterQuantity, dimeQuantity, nickleQuantity) {
    let credit = 0;
    let change = 0;
    let returnedCoins = [];
    let messages = [];

    let products = [
        {name: 'COLA', price: 100},
        {name: 'CHIPS', price: 50},
        {name: 'CANDY', price: 65}
    ];

    let quarter = {
        name: 'QUARTER',
        quantity: quarterQuantity
    };

    let dime = {
        name: 'DIME',
        quantity: dimeQuantity
    };

    let nickle = {
        name: 'NICKLE',
        quantity: nickleQuantity
    };

    let inventory = [
        {product: products[0].name, quantity: colaQuantity},
        {product: products[1].name, quantity: chipsQuantity},
        {product: products[2].name, quantity: candyQuantity}
    ];


    let exactChange = () => {
        if((dime.quantity === 0 && nickle.quantity === 0) ||
            (quarter.quantity === 0 && nickle.quantity === 0)) {
            messages.push('EXACT CHANGE ONLY');
        }
    };

    this.checkDisplay = () => {
        exactChange();
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
            nickle.quantity += 1;
        } else if(coin === 'DIME') {
            credit += 10;
            dime.quantity += 1;
        } else if(coin === 'QUARTER') {
            credit += 25;
            quarter.quantity += 1;
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
        let productPrice = products[productIndex].price;

        if(inventory[productIndex].quantity === 0) {
            messages.push('SOLD OUT');
        } else if(credit < productPrice) {
            messages.push('PRICE $' + price);
        } else if(credit === productPrice) {
            messages.push('THANK YOU');
            credit = 0;
            inventory[productIndex].quantity -= 1;
        } else if(credit > productPrice) {
            messages.push('THANK YOU');
            change = (credit - productPrice);
            credit = 0;
        }
    };

    let makeChange = (changeToMake) => {
        while(changeToMake > 0) {
            if((changeToMake - 25) >= 0) {
                returnedCoins.push('QUARTER');
                changeToMake -= 25;
                quarter.quantity -= 1;
            } else if((changeToMake - 10) >= 0) {
                returnedCoins.push('DIME');
                changeToMake -= 10;
                dime.quantity -= 1;
            } else if((changeToMake - 5) >= 0) {
                returnedCoins.push('NICKLE');
                changeToMake -= 5;
                nickle.quantity -= 1;
            }
        }
    };

    this.coinReturn = () => {
        if(credit > 0) {
            makeChange(credit);
            credit = 0;
        }

    };
}
module.exports = VendingMachine;