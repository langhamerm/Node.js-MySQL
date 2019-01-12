var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Pharmacy420!",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    managerOptions();
});


function managerOptions() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            console.log(answer);
            if (answer.action === "View Products for Sale") {
                viewProducts();
            }
            else if (answer.action === "View Low Inventory") {
                viewLow();
            }
            else if (answer.action === "Add to Inventory") {
                addInventory();
            }
            else if (answer.action === "Add New Product") {
                addProduct();
            }
        });
}
function viewLow() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.log(results[i].product_name)
            }
        }
    })
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "Would you like to return to the menu?",
        choices: [
            "Yes",
            "No"
        ]
    })
    .then(function (answer) {
        if (answer.action === "Yes") {
            managerOptions();
        }
        else {
            console.log("Goodbye for now!");
            connection.end();
        }
    });
}
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
    })
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "Would you like to return to the menu?",
        choices: [
            "Yes",
            "No"
        ]
    })
    .then(function (answer) {
        if (answer.action === "Yes") {
            managerOptions();
        }
        else {
            console.log("Goodbye for now!");
            connection.end();
        }
    });
}
function addInventory() {
    //ask user which product to add stock to
  inquirer
  .prompt([
    {
      name: "product",
      type: "input",
      message: "What is the product you would like to add to?"
    },
    {
      name: "stock",
      type: "input",
      message: "How many would you like in stock?"
    }
  ])
  .then(function(answer) {
    connection.query(
      "UPDATE products SET ? WHERE ?",
     [ {
        stock_quantity: parseInt(answer.stock)

      },
      {
        product_name: answer.product
      }
    ],
      function(err) {
        if (err) throw err;
        console.log("Your inventory has been updated!");
        managerOptions();
      }
    );
  });
}
function addProduct() {
    // user enters information about new product
    inquirer
      .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the product you would like to post?"
        },
        {
          name: "department",
          type: "input",
          message: "What department would you like to place your product in?"
        },
        {
          name: "price",
          type: "input",
          message: "Whats the price?",
        },
        {
            name: "stock",
            type: "input",
            message: "How many units to add to stock?",
          }
      ])
      .then(function(answer) {
        // add user input into databse
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.stock
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was added successfully!");
            managerOptions();
          }
        );
      });
  }