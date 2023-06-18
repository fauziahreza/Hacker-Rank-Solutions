'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
  return inputString[currentLine++];
}

function Activity(amount) {
    this.amount = amount;
    
    this.getDescription = function(){
        return `Activity with amount ${this.amount}`;
    };
    
    this.setAmount = function (amount){
        if (amount <= 0){
            return false;
        } else {
            this.amount = amount;
            return true;
        }
    };
    
    this.getAmount = function(){
        return this.amount;
    };
}

function Payment(amount, receiver) {
    Activity.call(this, amount);
    this.receiver = receiver;
    
    this.getAmount = function(){
        return this.amount;
    };
    
    this.getReceiver = function(){
        return this.receiver;
    };
    
    this.setReceiver = function(receiver){
        this.receiver = receiver;
    };
    
    this. setAmount = function (amount){
        return false;
    };
    
    this.getDescription = function(){
        return `Payment with amouny ${this.getAmount()} and receiver ${this.getReceiver()}`;
    };
}

function Refund(amount, sender) {
    Activity.call(this, amount);
    
    this.sender = sender;
    
    this.getAmount = function(){
        return this.amount;
    };
    
    this.getSender = function(){
        return this.sender;
    };
    
    this.setAmount = function(amount){
        if (amount < 0){
            return false;
        } else{
            this.amount = amount;
            return true;
        }
    };
    
    this.setSender = function(sender){
        this.sender = sender;
    };
    
    this.getDescription = function (){
        return `Refund with amount ${this.getAmount()} and sender ${this.getSender()}`;
    };
}

Refund.prototype = Object.create(Activity.prototype);
Refund.prototype.constructor = Refund;


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const objectType = readLine().trim();
    
    const inputsForObjectCreation = readLine().trim().split(' ');
    const updatedAmount = parseInt(readLine().trim());
    const updatedSenderReceiver = readLine().trim();
    switch(objectType) {
        case 'Payment':
            const paymentObj = new Payment(parseInt(inputsForObjectCreation[0]), inputsForObjectCreation[1]);
            ws.write(`Payment object created with amount ${paymentObj.getAmount()} and receiver ${paymentObj.getReceiver()}\n`);
            if(paymentObj.setAmount(updatedAmount)) {
                ws.write(`Amount updated to ${updatedAmount}\n`);
            } else {
                ws.write(`Amount not updated\n`);
            }
            paymentObj.setReceiver(updatedSenderReceiver);
            ws.write(`Receiver updated to ${updatedSenderReceiver}\n`);
            ws.write(`Payment object details - amount is ${paymentObj.getAmount()} and receiver is ${paymentObj.getReceiver()}\n`);
            ws.write(`Payment.prototype has property setAmount: ${Payment.prototype.hasOwnProperty('setAmount')}\n`);
            ws.write(`Payment.prototype has property getAmount: ${Payment.prototype.hasOwnProperty('getAmount')}\n`);
            ws.write(`Payment.prototype has property setReceiver: ${Payment.prototype.hasOwnProperty('setReceiver')}\n`);
            ws.write(`Payment.prototype has property getReceiver: ${Payment.prototype.hasOwnProperty('getReceiver')}\n`);
            break;
        case 'Refund':
            const refundObj = new Refund(parseInt(inputsForObjectCreation[0]), inputsForObjectCreation[1]);
            ws.write(`Refund object created with amount ${refundObj.getAmount()} and sender ${refundObj.getSender()}\n`);
            if(refundObj.setAmount(updatedAmount)) {
                ws.write(`Amount updated to ${updatedAmount}\n`);
            } else {
                ws.write(`Amount not updated\n`);
            }
            refundObj.setSender(updatedSenderReceiver);
            ws.write(`Sender updated to ${updatedSenderReceiver}\n`);
            ws.write(`Refund object details - amount is ${refundObj.getAmount()} and sender is ${refundObj.getSender()}\n`);
            ws.write(`Refund.prototype has property setAmount: ${Refund.prototype.hasOwnProperty('setAmount')}\n`);
            ws.write(`Refund.prototype has property getAmount: ${Refund.prototype.hasOwnProperty('getAmount')}\n`);
            ws.write(`Refund.prototype has property setSender: ${Refund.prototype.hasOwnProperty('setSender')}\n`);
            ws.write(`Refund.prototype has property getSender: ${Refund.prototype.hasOwnProperty('getSender')}\n`);
            break;
        default:
            break;
    }
}