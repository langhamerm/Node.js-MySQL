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
connection.connect(function (err) {
    if (err) throw err;
    browseProducts();
});

function browseProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
        // creates item list for users to select to purchase
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Enter the product id would you like to purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                // determine if quanitity is available
                if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity)
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Item(s) purchased successfully!");
                            console.log("Cost: " + chosenItem.price);
                            quitBuy();
                        }
                    );
                }
                else {
                    // quanity was too high
                    console.log("Insufficient quantity!");
                    quitBuy();
                }
            });
    });
}
function quitBuy() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Would you like to make another purchase?",
            choices: [
                "Yes",
                "No"
            ]
        })
        .then(function (answer) {
            if (answer.choices === "Yes") {
                browseProducts();
            }
            else {
                console.log("Goodbye for now!");
                connection.end();
            }
        });
}