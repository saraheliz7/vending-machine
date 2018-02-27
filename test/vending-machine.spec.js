const expect = require("chai").expect;
const VendingMachine = require("../src/vending-machine");

describe("The vending machine", function() {
    let vendingMachine;
    beforeEach(function() {
       vendingMachine = new VendingMachine();
    });

    describe("should display", function() {
        it("INSERT COIN before transaction begins", function() {
            expect(vendingMachine.checkDisplay()).to.equal("INSERT COIN");
        });

        it("current credit when an accepted coin is inserted", function() {
            vendingMachine.insertCoin('NICKLE');
            expect(vendingMachine.checkDisplay()).to.equal("$0.05");
        });

        it("current credit when an accepted coin is inserted", function() {
            vendingMachine.insertCoin('DIME');
            expect(vendingMachine.checkDisplay()).to.equal("$0.10");
        });

        it("current credit when an accepted coin is inserted", function() {
            vendingMachine.insertCoin('QUARTER');
            expect(vendingMachine.checkDisplay()).to.equal("$0.25");
        });

        it("current credit when multiple accepted coin is inserted", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('DIME');
            vendingMachine.insertCoin('NICKLE');
            expect(vendingMachine.checkDisplay()).to.equal("$0.40");
        });

        it("INSERT COIN when the first inserted coin is invalid", function() {
            vendingMachine.insertCoin('PENNY');
            expect(vendingMachine.checkDisplay()).to.equal("INSERT COIN");
        });

        it("current credit when an invalid coin is inserted after an accepted coin", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('PENNY');
            expect(vendingMachine.checkDisplay()).to.equal("$0.25");
        });
    });

    it("should return invalid coins to the coin return", function() {
        vendingMachine.insertCoin('QUARTER');
        vendingMachine.insertCoin('PENNY');
        expect(vendingMachine.checkDisplay()).to.equal("$0.25");
        expect(vendingMachine.getReturnedCoins()).to.deep.equal(['PENNY']);
    });

    it("should return invalid coins to the coin return when invalid coin is inserted before valid", function() {
        vendingMachine.insertCoin('PENNY');
        vendingMachine.insertCoin('QUARTER');
        expect(vendingMachine.checkDisplay()).to.equal("$0.25");
        expect(vendingMachine.getReturnedCoins()).to.deep.equal(['PENNY']);
    });

    describe("will display", function() {

        it("the available products", function() {
            expect(vendingMachine.displayProducts()).to.deep.equal(['COLA', 'CHIPS', 'CANDY']);
        });

        it("PRICE and the price of selected item when no coins are inserted", function() {
            vendingMachine.selectProduct(0);
            expect(vendingMachine.checkDisplay()).to.equal('PRICE $1.00');
        });

        it("PRICE and the price of selected item then INSERT COIN when no coins are inserted", function() {
            vendingMachine.selectProduct(0);
            expect(vendingMachine.checkDisplay()).to.equal('PRICE $1.00');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
        });

        it("PRICE and the price of selected item and then available credit when coins are inserted but " +
            "credit still isn't enough", function() {
            vendingMachine.insertCoin('DIME');
            vendingMachine.selectProduct(0);
            expect(vendingMachine.checkDisplay()).to.equal('PRICE $1.00');
            expect(vendingMachine.checkDisplay()).to.equal('$0.10');
        });

        it("THANK YOU after enough money has been inserted and the product is dispensed ", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.selectProduct(0);
            expect(vendingMachine.checkDisplay()).to.equal('THANK YOU');
        });

        it("INSERT COIN after product is dispensed and after THANK YOU is displayed ", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.selectProduct(0);
            expect(vendingMachine.checkDisplay()).to.equal('THANK YOU');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
        });

    });

    describe("will return", function() {

        it("change when credit is more than price of selected product", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.selectProduct(2);
            expect(vendingMachine.checkDisplay()).to.equal('THANK YOU');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
            expect(vendingMachine.getReturnedCoins()).to.deep.equal(['DIME']);
        });

        it("change when credit is more than price of selected product", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.selectProduct(2);
            expect(vendingMachine.checkDisplay()).to.equal('THANK YOU');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
            expect(vendingMachine.getReturnedCoins()).to.deep.equal(['QUARTER', 'DIME']);
        });

        it("change when credit is more than price of selected product", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('DIME');
            vendingMachine.insertCoin('DIME');
            vendingMachine.selectProduct(2);
            expect(vendingMachine.checkDisplay()).to.equal('THANK YOU');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
            expect(vendingMachine.getReturnedCoins()).to.deep.equal(['NICKLE']);
        });

        it("change and invalid coins when credit is more than price of selected product", function() {
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('PENNY');
            vendingMachine.insertCoin('DIME');
            vendingMachine.insertCoin('DIME');
            vendingMachine.selectProduct(2);
            expect(vendingMachine.checkDisplay()).to.equal('THANK YOU');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
            expect(vendingMachine.getReturnedCoins()).to.deep.equal(['PENNY', 'NICKLE']);
        });

        it("coins inserted in vending machine when the coin return button is pressed", function() {
            vendingMachine.insertCoin('NICKLE');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.coinReturn();
            expect(vendingMachine.getReturnedCoins()).to.deep.equal(['QUARTER', 'NICKLE']);
        });

        it("coins inserted in vending machine when the coin return button is pressed and " +
            "then display INSERT COIN", function() {
            vendingMachine.insertCoin('NICKLE');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.coinReturn();
            expect(vendingMachine.getReturnedCoins()).to.deep.equal(['QUARTER', 'NICKLE']);
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
        });
    });
});

describe('The vending machine', function() {

    describe('will display', function() {

        it("SOLD OUT when selected product is out of stock", function() {
            let vendingMachine = new VendingMachine(2, 0, 1);
            vendingMachine.selectProduct(1);
            expect(vendingMachine.checkDisplay()).to.equal('SOLD OUT');
        });

        it("SOLD OUT, then INSERT COIN when selected product is out of stock and " +
            "there is no credit", function() {
            let vendingMachine = new VendingMachine(2, 0, 1);
            vendingMachine.selectProduct(1);
            expect(vendingMachine.checkDisplay()).to.equal('SOLD OUT');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
        });

        it("SOLD OUT then credit when selected product is out of stock and there is " +
            "credit in the machine", function() {
            let vendingMachine = new VendingMachine(2, 0, 1);
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.selectProduct(1);
            expect(vendingMachine.checkDisplay()).to.equal('SOLD OUT');
            expect(vendingMachine.checkDisplay()).to.equal('$0.50');
        });

        it("SOLD OUT when selected product changes from being in stock to out " +
            "of stock and the credit is equal to price", function() {
            let vendingMachine = new VendingMachine(2, 1, 1);
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.selectProduct(1);
            expect(vendingMachine.checkDisplay()).to.equal('THANK YOU');
            expect(vendingMachine.checkDisplay()).to.equal('INSERT COIN');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.insertCoin('QUARTER');
            vendingMachine.selectProduct(1);
            expect(vendingMachine.checkDisplay()).to.equal('SOLD OUT');
            expect(vendingMachine.checkDisplay()).to.equal('$0.50');
        });

        it("EXACT CHANGE ONLY when there isn't any money in the machine to make change", function() {
           let vendingMachine = new VendingMachine(5, 5, 5, 0, 0, 0);
           expect(vendingMachine.checkDisplay()).to.equal('EXACT CHANGE ONLY');
        });
    });
});