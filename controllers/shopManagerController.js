const User = require("../model/users")
const mysqlConnection = require('../mysql/mysqlConnection')

module.exports.createShopManager = (req, res) =>{
    const { last_Name, first_Name, email, password, contact_No } = req.body;
    const checkQuery = `SELECT email FROM users WHERE email = ?`;
    const checkValues = [email];

    mysqlConnection.query(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error checking user:', checkError);
            return res.status(500).json({ error: 'Error checking user' });
        }

        if (checkResult.length > 0) {
            // Removed function call to accountController.checkEmailExists as it seems redundant
            return res.status(400).json({ message: 'Email already exists' }); 
        } else {
            // Insert here the module that would check the account (e.g. Shop Owner) that is registering this account.
            // As well as which shop the account will be assigned to.

            const insertQuery = `
                INSERT INTO users (last_Name, first_Name, email, password, contact_No, role)
                VALUES (?, ?, ?, ?, ?, 'Manager')`;

            const insertValues = [last_Name, first_Name, email, password, contact_No];
            
            mysqlConnection.query(insertQuery,insertValues,(insertError,insertResult) =>{
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
module.exports.readManager = (req, res) => {
    const {user_id} = req.body; 
    const checkQuery = `SELECT * FROM users WHERE user_id = ? AND role = "Manager"`;
    const checkValues = [user_id];

    mysqlConnection.query(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error getting Shop Manager:', checkError);
            return res.status(500).json({ error: 'Error getting shop Manager from server' });
        }
        if (checkResult.length > 0) {
            res.status(200).json({ message: 'Shop Manager is found', result: checkResult });
        } else {
            res.status(404).json({ message: 'Shop Manager not found' });
        }
    });
};

module.exports.updateManager = (req, res) =>{ 

    // I'm not sure If this needs "AND role = 'Manager'". Same goes with the updateOwner
    // Might want to put this into the accountController instead.

    const {user_id, last_Name, first_Name, email, contact_No, password} = req.body;
    const updateQuery = `UPDATE users SET last_Name = ?, first_Name = ?, email = ?, contact_No = ?, password = ? WHERE user_id = ?`;
    const updateValues = [last_Name, first_Name, email, contact_No, user_id, password];

    mysqlConnection.query(updateQuery, updateValues, (updateError, updateResult) => {
        if (updateError) {
            console.error('Error updating shop manager:', updateError);
            return res.status(500).json({ error: 'Error updating shop manager' });
        }
        res.status(200).json(updateResult);
    });
};

// This is also in the same predicament as Update
module.exports.deleteManager = (req, res) =>{

    const {user_id} = req.body;
    const query = `DELETE FROM users WHERE role = "Manager" AND user_id = ?`;
    const values = [user_id];
    
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error ('Error deleting Manager:', error);
            return res.status(500).json({ error: 'Error deleting Manager' });
        }
        res.status(200).json({message: 'Manager deleted', result: result});
    });
};

