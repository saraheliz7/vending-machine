function VendingMachine() {
    let credit = 0;

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
        }
    };

}



module.exports = VendingMachine;