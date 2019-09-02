var mysql = require ("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pae.mepaim2",
    database: "products_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllItems();
    start();
});

function queryAllItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price)
        }
    })
};

function start() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
    inquirer.prompt([
        {
            name: "chosenItemId",
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            },
            message: "What item would you like to buy? (Please state the item_id no.)"
        },
        {
            name: "howMuchToBuy",
            type: "input",
            message: "How many would you like to buy?"
        },
    ])
    .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.chosenItemId) {
                chosenItem = res[i];
            }
        }
        if (chosenItem.stock_quantity < res[i].answer.howMuchToBuy) {
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: stock_quantity - answer.howMuchToBuy
                    },
                    {
                        item_id: chosenItem
                    }
                ],
                function(error) {
                    if (error) throw err;
                    console.log("You're order has been successfully placed");
                    start();
                }
            )
        } else {
            console.log("Sorry, we have insufficent inventory at the moment. Please check again later");
            start();
        }
    })
})};

