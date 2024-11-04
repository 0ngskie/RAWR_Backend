const User = require("../models/users")
const mysqlCon = require('../mysql/mysqlCon')


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
    })
}
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
    })
}
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
    })
}
// module that would create the Customers account
module.exports.createCustomer = (req, res) =>{
    const{last_Name, first_Name, email, password, contact_No, role} = req.body;
    const checkQuery = `SELECT email FROM users`;
    const checkValues =[email];

    mysqlConnection.execute(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }
        if (checkResult.length > 0){
            //checks if the email exists (check the module found in line 20)
            this.checkEmailExist
        } 
        else{
            const insertQuery = `INSERT INTO user (last_Name, first_Name, email, password, contact_No, role)
                                values (?,?,?,?,?, Customer)`;
            const insertValues = [last_Name, first_Name, email, password, contact_No, role];

            mysqlConnection.execute(insertQuery, insertValues, (insertError,insertResult) =>{
                if(insertError){
                    console.error('Error creating customer:', insertError);
                    return res.status(500).json({ error: 'Error creating customer Account' });
                }
                res.status(201).json(insertResult);
            })
        }
    })
}

// module that would create the Shop Owners account
module.exports.createShopOwner = (req,res) =>{
    const{ last_Name, first_Name, email, password, contact_No} = req.body;
    const checkQuery =`SELECT email FROM users WHERE email =?`;
    const checkValues = [email];

    mysqlCon.query(checkQuery,checkValues, (checkError,checkResult) =>{
        if(checkError){
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }
        if(checkResult.length > 0){
            // checks if the email exists (check the module found in line 20)
            this.checkEmailExist
        } 
        else{ // add the Shop Owner account details to the Database
            const insertQuery = `INSERT INTO user (last_Name, first_Name, email, password, contact_No, role)
                                values (?,?,?,?,?, Shop Owner)`;
            const insertValues = [last_Name, first_Name, email, password, contact_No, role];
            
            mysqlConnection.execute(insertQuery, insertValues, (insertError, insertResult) =>{
                if(insertError){
                    console.error('Error creating shop owner:', insertError);
                    return res.status(500).json({ error: 'Error creating shop owner Account' });
                }
                res.status(201).json(insertResult);
            })
        }
    })
}

module.exports.createShopManager = (req, res) =>{
    const {last_Name, first_Name, email, password, contact_No, role, shop_id} = req.body;
    const checkQuery = `SELECT email FROM users WHERE email =?`;
    const checkValues = [email];

    mysqlCon.query(checkQuery, checkValues, (checkError, checkResult) =>{
        if(checkError){
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }
        if(checkResult.length > 0){
            // checks if the email exists (check the module found in line 20)
            this.checkEmailExist
        }else{
            /* insert here the module where it would check for the Shop if its in the database
             * Once the shop is found it will then proceed to insert the details provided in the database
             */
            const insertQuery = `INSERT INTO user (last_Name, first_Name, email, password, contact_No, role, shop_id) 
                                VALUES (?,?,?,?,?,Manager,?)`;
            const insertValues = [last_Name, first_Name, email, password, contact_No, role, shop_id];
            
            mysqlConnection.execute(insertQuery,insertValues,(insertError,insertResult) =>{
                if(insertError){
                    console.error('Error creating shop manager:', insertError);
                    return res.status(500).json({ error: 'Error creating shop manager Account' });
                }
                res.status(201).json(insertResult);
            })
        }
    })
}

// Get the details of the Shop Manager
module.exports.getManager = (req, res) => {
    const{ last_Name, first_Name, email, role, shop_id} = req.body;

    const query = `SELECT last_Name FROM user WHERE role = 'Manager' AND shop_id = ?`;

    const values = [last_Name,first_Name,email,role,shop_id];
    
    mysqlConnection.execute(query, values, (error, result) => {
        if (error) {
            console.error('Error fetching managers:', error);
            return res.status(500).json({ error: 'Error fetching managers' });
        }
        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({error: 'Manager not found'});
        }
    })
}

// Update User account
module.exports.editUserAccount = (req, res) =>{
    const {last_Name, first_Name, email, contact_No, password} = req.body;
    const query = `UPDATE user set last_Name = ?, first_Name = ?, email = ?, password = ? WHERE user_id = ?`;
    const values = [last_Name, first_name, email, contact_No, password, req.params.id];

    mysqlConnection.execute(query, values, (error, result) => {
        if (error) {
            console.error('Error updating customer description:', error);
            return res.status(500).json({ error: 'Error updating customer account' });
        }
        res.status(200).json(result);
        res.status(200).json({message: "Customer Account updated"});
    })
}

module.exports.deleteUserAcount = (req,res) =>{
    const query = `DELETE FROM user where user_id =?`;
    const values = [req.params.id];

    mysqlConnection.execute(query, values, (error, result) => {
        if(error){
            console.error ('Error deleting user:', error);
            return res.status(500).json({error: 'Error deleting your account'});
        }
        res.status (200).json(result);
        res.status(200).json({ message: ' User account has been deleted'});
    })
}

// Delete

module.exports.deleteUser = (req, res) => {
    const query = `DELETE FROM user WHERE user_id = ?`;

    const values = [req.params.id];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ error: 'Error deleting user' });
        }
        res.status(200).json(result);
        res.status(200).json({ message: 'User deleted' })
    })
}