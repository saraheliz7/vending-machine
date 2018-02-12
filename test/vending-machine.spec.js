const expect = require("chai").expect;
const VendingMachine = require("../src/vending-machine");

describe("The vending machine", function() {
    it("should display INSERT COIN before transaction begins", function() {
        const vendingMachine = new VendingMachine();
        expect(vendingMachine.checkDisplay()).to.equal("INSERT COIN");
    });
});