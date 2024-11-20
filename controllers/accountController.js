const User = require("../model/users")
const mysqlConnection = require('../mysql/mysqlConnection')

// this module checks the Users password  (Under review whether to keep or disregard)
module.exports.checkPassword = (req,res) =>{
    const {password} = req.body;
    const checkQuery = `SELECT * FROM users WHERE password =?`;
    const checkValues = [password];
    mysqlConnection.execute(checkQuery,checkValues, (checkError, checkResults) =>{
        if(checkError){
            console.error('Error checking password:', checkError);
            return res.status(500).json({ error: 'Error checking password' });
        } else{
            end
        }
    });
};
// this module checks if the Email already exists in the Database 
module.exports.checkEmailExist = (req,res) =>{
    const {email} = req.body;
    const checkQuery = `SELECT * FROM users WHERE email =?`;
    const checkValues = [email];
    mysqlConnection.execute(checkQuery,checkValues, (checkError, checkResults) =>{
        if(checkError){
            console.error('Error checking email existence:', checkError);
            return res.status(500).json({ error: 'Error checking email existence' });
        }
        if(checkResults.length > 0){
            // Email already exists
            return res.status(400).json({ error: 'Email already exists' });
        }
        else{
            end
        }
    });
};
// this module validates if the email input by the user matches one another
module.exports.checkEmailMatch = (req,res) => {
    const{email} = req.body;
    const checkQuery = `SELECT email FROM users where email = ?`;
    const checkValues = [email];
    mysqlConnection.execute(checkQuery, checkValues, (checkError, checkResult) => {
        if(checkError){
            console.error('Error checking email match:', checkError);
            return res.status(500).json({ error: 'Error checking email match' });
        }
        if(checkResult){
            if(email === checkResult.email){
                // Email match
                return res.status(200).json({ message: 'Email match' });
            }else{
                // Email does not match
                return res.status(400).json({ error: 'Email does not match' });
            }
        }
    });
};

// this module validates the Users login in the System ( UI end Login Page)
module.exports.validateAccountLogin = (req,res) =>{
    const {email, password} = req.body;
    const checkQuery = `SELECT * FROM users WHERE email =? AND password =?`;
    const checkValues = [email, password];

    mysqlConnection.execute(checkQuery, checkValues, (checkError, checkResult) =>{
        if(checkError){
            console.error('Error checking account login:', checkError);
            return res.status(500).json({ error: 'Error checking account login' });
        }
        if(checkResult.length > 0){
            // Account login successful
            return res.status(200).json({ message: 'Account login successful' });
        }
        else{
            // Incorrect email or password
            return res.status(401).json({ error: 'Incorrect email or password' });
        }
    });
};

// Update User account
module.exports.editUserAccount = (req, res) =>{
    const {last_Name, first_Name, email, contact_No, password} = req.body;
    const query = `UPDATE users SET last_Name = ?, first_Name = ?, email = ?, contact_No = ?, password = ? WHERE user_id = ?`;
    const values = [last_Name, first_Name, email, contact_No, password, req.params.id];

    mysqlConnection.execute(query, values, (error, result) => {
        if (error) {
            console.error('Error updating customer description:', error);
            return res.status(500).json({ error: 'Error updating customer account' });
        }
        res.status(200).json(result);
    });
};

module.exports.deleteUserAccount = (req,res) =>{
    const query = `DELETE FROM user where user_id =?`;
    const values = [req.params.id];

    mysqlConnection.execute(query, values, (error, result) => {
        if(error){
            console.error ('Error deleting user:', error);
            return res.status(500).json({error: 'Error deleting your account'});
        }
        res.status (200).json(result);
        res.status(200).json({ message: ' User account has been deleted'});
    });
};