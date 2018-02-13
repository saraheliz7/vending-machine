function VendingMachine() {
    let credit = 0;
    let returnedCoins = [];


    this.checkDisplay = () => {
        if(credit === 0) {
            return 'INSERT COIN';
        } else {
            return credit.toFixed(2);
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
    }

}



module.exports = VendingMachine;