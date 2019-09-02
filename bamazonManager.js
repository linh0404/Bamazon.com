var mysql = require ("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pae.mepaim2",
    database: "products_db"
});

connection.connect(function(err){
    if (err) throw error;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "What would you like to do?",
                choices:    ["View Products for Sale", 
                            "View Low Inventory", 
                            "Add to Inventory", 
                            "Add New Product", 
                            "EXIT"]
            }
        ])
    .then(function(answer) {
        if (answer.choice === "View Products for Sale") {
            viewProducts();
        } else if (answer.choice === "View Low Inventory") {
            viewLowInventory();
        } else if (answer.choice === "Add to Inventory") {
            addToInventory();
        } else if (answer.choice === "Add New Product") {
            addNewProduct();
        } else {
            connection.end();
        }
    })};


function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
        }
    })
    start();
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 45", function(err, res) {
        if (err) throw err; 
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
        }
    })
    start();
};

function addToInventory() {
connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer.prompt([
        {
            name: "addInventory", 
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            },
            message: "What item would you like to add inventory to?"
        },
        {
            name: "howMuchToAdd",
            type: "input",
            message: "How many would you like to add back into stock?"
        },
    ])
    .then(function(answer) {
        connection.query("UPDATE products SET ? WHERE ?", 
        [
            {
                stock_quantity: stock_quantity + answer.howMuchToAdd
            },
            {
                item_id: answer.addInventory
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log("Inventory added");
            start();
        })
    })
})
};

function addNewProduct() {
    inquirer.prompt([
        {
            name: "itemName",
            type: "input",
            message: "What item would you like to add?"
        },
        {
            name: "departmentName",
            type: "input", 
            message: "What department does your item fall under?"
        },
        {
            name: "itemPrice",
            type: "input",
            message: "How much do you want to sell your item for?"
        },
        {
            name: "stockQuantity",
            type: "input",
            message: "How much stock do you want to add into inventory?"
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO products SET ?", 
        {
            product_name: answer.itemName,
            department_name: answer.departmentName,
            price: answer.itemPrice,
            stock_quantity: answer.stockQuantity
        },
        function(err) {
            if (err) throw err;
            console.log("Your items were added into stock");
            start();
        })
    })
};