const User = require("../models/users")
const mysqlConnection = require('../mysql/mysqlConnection')


// Create

// module that would create the Shop Owners account
module.exports.createShopOwner = (req,res) =>{
    const{ last_Name, first_Name, email, password, contact_No, role} = req.body;
    const checkQuery =`SELECT email FROM users WHERE email =?`;
    const checkValues = [email];

    mysqlConnection.execute(checkQuery,checkValues, (checkError,checkResult) =>{
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
    });
};

// Read

module.exports.readOwner = (req, res) => {
    const { shop_id, shop_Name, shop_Address } = req.params; // Use req.params to get the parameters from the URL
    const checkQuery = `SELECT shop_Page_Status FROM shops WHERE shop_id = ? OR shop_Name = ? OR shop_Address = ?`;
    const checkValues = [shop_id, shop_Name, shop_Address];

    mysqlConnection.execute(checkQuery, checkValues, (checkError, checkResult) => {
        if (checkError) {
            console.error('Error getting shop status:', checkError);
            return res.status(500).json({ error: 'Error getting shop status from server' });
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

    const { shop_id, last_Name, first_Name, email, contact_No } = req.body;
    const updateQuery = `UPDATE user SET last_Name =?, first_Name =?, email =?, contact_No =? WHERE shop_id =?`;
    const updateValues = [last_Name, first_Name, email, contact_No, shop_id];

    mysqlConnection.execute(updateQuery, updateValues, (updateError, updateResult) => {
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
    const query = `DELETE FROM user WHERE role = 'ShopOwner' AND shop_id = ?`;

    const values = [req.params.id];
    mysqlConnection.execute(query, values, (error, result) => {
        if(error){
            console.error ('Error deleting manager:', error);
            return res.status(500).json({ error: 'Error deleting manager' });
        }
        res.status(200).json({result: result});
        res.status(200).json({message: 'Owner deleted'});
    });
};