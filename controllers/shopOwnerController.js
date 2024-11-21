const User = require("../model/users")
const mysqlConnection = require('../mysql/mysqlConnection')


// Create
module.exports.createShopOwner = (req, res) => {
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
            
            const insertQuery = `
                INSERT INTO users (last_Name, first_Name, email, password, contact_No, role)
                VALUES (?, ?, ?, ?, ?, 'Shop Owner')`;

            const insertValues = [last_Name, first_Name, email, password, contact_No]; //Adjustments to query and values

            mysqlConnection.query(insertQuery, insertValues, (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating shop owner:', insertError);
                    return res.status(500).json({ error: 'Error creating shop owner account' });
                }
                res.status(201).json({ message: 'Shop owner account created successfully', result: insertResult });
            });
        }
    });
};


// Read
module.exports.readOwner = (req, res) => {
    const {user_id} = req.body;
    const checkQuery = `SELECT * FROM users WHERE user_id = ? AND role = "Shop Owner"`; //Changed Query to only require user_id and must be a 'Shop Owner'
    const checkValues = [user_id];

    mysqlConnection.query(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error getting Shop Owner:', checkError);
            return res.status(500).json({ error: 'Error getting shop owner from server' });
        }
        if (checkResult.length > 0) {
            res.status(200).json({ message: 'Shop Owner is found', result: checkResult });
        } else {
            res.status(404).json({ message: 'Shop Owner not found' });
        }
    });
};

// Update
module.exports.updateOwner = (req, res) => {

    const {user_id, last_Name, first_Name, email, contact_No } = req.body;
    const updateQuery = `UPDATE users SET last_Name = ?, first_Name = ?, email = ?, contact_No = ? WHERE user_id = ?`;
    const updateValues = [last_Name, first_Name, email, contact_No, user_id];

    mysqlConnection.query(updateQuery, updateValues, (updateError, updateResult) => {
        if (updateError) {
            console.error('Error updating shop owner:', updateError);
            return res.status(500).json({ error: 'Error updating shop owner' });
        }
        res.status(200).json(updateResult);
    });
};

// Delete
// copy n paste from shop manager - araneta
module.exports.deleteOwner = (req, res) =>{

    const {user_id} = req.body;
    const query = `DELETE FROM users WHERE role = "Shop Owner" AND user_id = ?`;
    const values = [user_id]; // How should we handle the foreign key constraints?
    
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error ('Error deleting Owner:', error);
            return res.status(500).json({ error: 'Error deleting Owner' });
        }
        res.status(200).json({result: result});
        res.status(200).json({message: 'Owner deleted'});
    });
};