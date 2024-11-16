const User = require("../models/users");
const mysqlConnection = require('../mysql/mysqlConnection');

// module that would create the Customers account
module.exports.createCustomer = (req, res) => {
    const { last_Name, first_Name, email, password, contact_No, role } = req.body;
    const checkQuery = `SELECT email FROM users WHERE email = ?`;
    const checkValues = [email];

    mysqlConnection.execute(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }
        if (checkResult.length > 0) {
            // Email already exists
            return res.status(400).json({ error: 'Email already exists' });
        } else {
            const insertQuery = `INSERT INTO users (last_Name, first_Name, email, password, contact_No, role) VALUES (?, ?, ?, ?, ?, ?)`;
            const insertValues = [last_Name, first_Name, email, password, contact_No, role];

            mysqlConnection.execute(insertQuery, insertValues, (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating customer:', insertError);
                    return res.status(500).json({ error: 'Error creating customer account' });
                }
                res.status(201).json(insertResult);
            });
        }
    });
};