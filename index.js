// let balance = 500.00;

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed === true) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      return console.log("insufficient funds");
    }
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -(this.amount);
  }
  get isAllowed() {
    if (this.amount < this.account.balance) {
      return true;
    }
    return false;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  get isAllowed() {
    return true;
  }
}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    return this.transactions.reduce((a, b) => a + b.value, 0);
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log("transactions:", myAccount.balance);
