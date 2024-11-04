const User = require("../models/users")
const mysqlCon = require('../mysql/mysqlCon')


// this module checks the Users password  (Under review whether to keep or disregard)
module.exports.checkPassword = (req,res) =>{
    const {password} = req.body;
    const checkQuery = `SELECT * FROM users WHERE password =?`;
    const checkValues = [password];
    mysqlCon.query(checkQuery,checkValues, (checkError, checkResults) =>{
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
    mysqlCon.query(checkQuery,checkValues, (checkError, checkResults) =>{
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

    mysqlCon.query(checkQuery, checkValues, (checkError, checkResult) =>{
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

    mysqlCon.query(checkQuery, checkValues, (checkError, checkResult) => {
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

            mysqlCon.query(insertQuery, insertValues, (insertError,insertResult) =>{
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
module.exports.createUser = (req, res) =>{
    const {last_Name, first_Name, username, email, password, user_Mobile_Num, role, manager_id, shop_id} = req.body;
    const checkQuery = `SELECT * FROM users WHERE email =? OR username = ?`;
    const checkValues = [email, username];

    // Check if email or username already exists in the database
    mysqlCon.query(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }

        if (checkResult.length > 0) {
            // Either email or username already exists
            return res.status(400).json({ error: 'Email or Username already exists' });
        } else {
            // If account isn't found in the DB
            // Proceed with creating the user
            const insertQuery = `INSERT INTO user (last_Name, first_Name, username, email, password, user_Mobile_Num, role, manager_id, shop_id) 
                                 VALUES (?, ?, ?, ?, ?, ?)`;
            const insertValues = [last_Name, first_Name, email, username, password, user_Mobile_Num, role, manager_id, shop_id];

            mysqlCon.query(insertQuery, insertValues, (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating user:', insertError);
                    return res.status(500).json({ error: 'Error creating user' });
                }

                res.status(201).json(insertResult);
            })
        }
    })
}

// Read
module.exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM user'

    mysqlCon.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Error fetching users' });
        }

        res.status(200).json(results);
    })
}


module.exports.getUser = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM user WHERE username = ? AND password = ?'

    const values = [username, password];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ error: 'Error fetching user' });
        }
        
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    })
}

// Update
module.exports.updateUser = (req, res) => {
    const { lastName, firstName, email, username, password, userType } = req.body;

    const query = `UPDATE user SET lastName = ?, firstName = ?, email = ?, username = ?, password = ?, userType = ? WHERE user_id = ?`;

    const values = [lastName, firstName, email, username, password, userType, req.params.id];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Error updating user' });
        }

        res.status(200).json({ message: 'User updated' })
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

        res.status(200).json({ message: 'User deleted' })
    })
}