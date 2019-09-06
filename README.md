# Bamazon.com
Welcome to Bamazon! This is an Amazon like store-front built using mySQL and Node.js

Within the customer portal, you can view available inventory, choose an item you'd like to purchase and voila! Tranction complete! However, if we do not have enough of the selected item, you'll be notified and the transaction will not go through. 

Within the manager portal, you can view all inventory in the store, view low inventory (where SOH < 5), add inventory back into stock or even add a new product to your inventory!

Happy shopping!

# Getting Started
Make sure you install all the dependancies you need for the project including node.js and mySQL 

Once you have these installed, navigate to the directory and enter the following commands into terminal

Logging in as a customer
``` 
git clone git@github.com:linh0404/Bamazon.com.git
cd bamazon
npm install
node bamazonCustomer.js 
```
or

Logging in as a manager
```
git clone git@github.com:linh0404/Bamazon.com.git
cd bamazon
npm install
node bamazonManager.js 
```

# How it works

Using it is super simple. Once you enter the initial prompts as a customer, you get given a choice of items to buy and scroll through:

![Image One](/images/1.png)

Once you have chosen an item, it will prompt how many and then provide the total payable. 

![Image Two](/images/2.png)

Using it as a manager gives you a wider array of choices - as displayed below: 

![Image Three](/images/3.png)

You can view products for sale...

![Image Four](/images/4.png)

You can view low inventory...

![Image Five](/images/5.png)

You can also add existing inventory or add new products!

![Image Six](/images/6.png)

# Technologies Used

- Javascript
- Node.js
- mySQL
- NPM Packages
  ..* mySQL
  ..* inquirer


