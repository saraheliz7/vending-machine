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

    describe("will display", function() {

        it("the available products", function() {
            expect(vendingMachine.displayProducts()).to.deep.equal(['COLA', 'CHIPS', 'CANDY']);
        });

        it("PRICE and the price of selected item when no coins are inserted", function() {
            vendingMachine.selectProduct(0);
            expect(vendingMachine.checkDisplay()).to.equal('PRICE $1.00');
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


});