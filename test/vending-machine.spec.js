const expect = require("chai").expect;
const VendingMachine = require("../src/vending-machine");

describe("The vending machine", function() {

    it("should display INSERT COIN before transaction begins", function() {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine.checkDisplay()).to.equal("INSERT COIN");
    });

    it("should display current credit when an accepted coin is inserted", function() {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCoin('NICKLE');
        expect(vendingMachine.checkDisplay()).to.equal("0.05");
    });

    it("should display current credit when an accepted coin is inserted", function() {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCoin('DIME');
        expect(vendingMachine.checkDisplay()).to.equal("0.10");
    });

    it("should display current credit when an accepted coin is inserted", function() {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCoin('QUARTER');
        expect(vendingMachine.checkDisplay()).to.equal("0.25");
    });

    it("should display current credit when multiple accepted coin is inserted", function() {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCoin('QUARTER');
        vendingMachine.insertCoin('DIME');
        vendingMachine.insertCoin('NICKLE');
        expect(vendingMachine.checkDisplay()).to.equal("0.40");
    });

    it("should display INSERT COIN when the first inserted coin is invalid", function() {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCoin('PENNY');
        expect(vendingMachine.checkDisplay()).to.equal("INSERT COIN");
    });

    it("should display current credit when an invalid coin is inserted after an accepted coin", function() {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCoin('QUARTER')
        vendingMachine.insertCoin('PENNY');
        expect(vendingMachine.checkDisplay()).to.equal("0.25");
    });

    it("should return invalid coins to the coin return", function() {
        const vendingMachine = new VendingMachine();
        vendingMachine.insertCoin('QUARTER')
        vendingMachine.insertCoin('PENNY');
        expect(vendingMachine.checkDisplay()).to.equal("0.25");
        expect(vendingMachine.getReturnedCoins()).to.deep.equal(['PENNY']);
    });

});