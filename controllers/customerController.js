const User = require("../model/users");
const mysqlConnection = require('../mysql/mysqlConnection');

// module that would create the Customers account
module.exports.createCustomer = (req, res) => {
    const { last_Name, first_Name, email, password, contact_No } = req.body;

    const checkEmailQuery = `SELECT email FROM users WHERE email = ?`;
    const checkEmailValues = [email];

    mysqlConnection.query(checkEmailQuery, checkEmailValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }
        if (checkResult.length > 0) {
            // Email already exists
            return res.status(400).json({ error: 'Email already exists' });
        }

        const insertAccountQuery = `INSERT INTO users (last_Name, first_Name, email, password, contact_No, role) VALUES (?, ?, ?, ?, ?, 'Customer')`;
        const accountValues = [last_Name, first_Name, email, password, contact_No];

        mysqlConnection.query(insertAccountQuery, accountValues, (error, result) => {
            if (error) {
                console.error('Error creating customer account:', error);
                return res.status(500).json({ error: 'Error creating customer account' });
            }
            res.status(201).json({ message: 'Successfully created Customer Account', data: req.body, result });
        });
    });
};


module.exports.displayAllCustomerAccount = (req,res)=>{
    const query = `SELECT * FROM users WHERE role = 'Customer'`;
    mysqlConnection.query(query, (error, checkResult) =>{
        if(error){
            console.error('Error displaying customer account:', error);
            return res.status(500).json({ error: 'Error displaying customer account' });
        }
        return res.status(200).json({message: 'Succesfful display of Customer Accounts', result: checkResult});
    });
};
module.exports.updateCustomerAccount = (req,res) =>{
    const user_id = req.params.id;
    const {last_Name, first_Name, email, password, contact_No} = req.body;
    const query = `UPDATE users SET last_Name = ?, first_Name = ?, email = ?, password= ?, contact_No = ? WHERE user_id = ?`;

    const checkValues =[last_Name, first_Name, email, password, contact_No, user_id]; 

    mysqlConnection.query(query, checkValues, (error, result) => {
        if (error) {
            console.error('Error updating customer description:', error);
            return res.status(500).json({ error: 'Error updating customer account' });
        }
        console.log('Updated customers Account, Changes made:',{
            last_Name,
            first_Name,
            email,
            password,
            contact_No
        });
         return res.status(200).json({message:'Succesfully updated the Users account', result: result});
    });
};

module.exports.deleteCustomerAccount = (req,res) =>{
    const user_id = req.params.id;
    const query = `DELETE FROM users WHERE user_id = ?`;
    const values = [user_id];
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error ('Error deleting user:', error);
            return res.status(500).json({ error: 'Error deleting customer account' });
        }
        if( result. affectedRows === 0){
            return res.status(404).json({ message: 'Customer account not found' });
        }
        console.log('Deleted the customer account no: ', user_id);
        res.status(200).json({ message: 'Customer account has been deleted'});
    });
};