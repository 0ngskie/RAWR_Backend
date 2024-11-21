const User = require("../model/users");
const mysqlConnection = require('../mysql/mysqlConnection');

// module that would create the Customers account
module.exports.createCustomer = (last_Name, first_Name, email, password, contact_No, req, res) => {
    const checkQuery = `SELECT email FROM users WHERE email = ?`;
    const checkValues = [email];

    mysqlConnection.query(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }
        if (checkResult.length > 0) {
            // Email already exists
            return res.status(400).json({ error: 'Email already exists' });
        } else {
            const insertQuery = `INSERT INTO users (last_Name, first_Name, email, password, contact_No, role) VALUES (?, ?, ?, ?, ?, Customer)`;
            const insertValues = [last_Name, first_Name, email, password, contact_No];

            mysqlConnection.execute(insertQuery, insertValues, (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating customer:', insertError);
                    return res.status(500).json({ error: 'Error creating customer account' });
                }
                res.status(201).json({message: 'Customer account created successfully', customer: req.body.customer, result: insertResult});
            });
        }
    });
};
module.exports.displayAllCustomerAccount = (res)=>{
    const query = `SELECT * FROM users WHERE role = 'Customer'`;
    mysqlConnection.query(query, (error, checkResult) =>{
        if(error){
            console.error('Error displaying customer account:', error);
            return res.status(500).json({ error: 'Error displaying customer account' });
        }
        else{
            res.status(200).json({message: 'Succesfful display of Customer Accounts', result: checkResult});
        }
    });
};