function VendingMachine() {
    let credit = 0;

    this.checkDisplay = () => {
        if(credit === 0) {
            return 'INSERT COIN';
        }
    };

};



module.exports = VendingMachine;