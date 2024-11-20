const User = require("../model/users")
const mysqlCon = require('../mysql/mysqlConnection')

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

    const values = [last_Name,first_Name,email,role,shop_id, req.params.shop_id];
    
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
module.exports.editManagerProfile = (req, res) =>{
    const {last_Name, first_Name, email, contact_No, password, shop_id} = req.body;
    const query = `UPDATE user set last_Name =?, first_Name =?, email =?, password =? WHERE role = 'Manager' AND shop_id =?`;

    const values = [last_Name, first_Name, email, contact_No, password, req.params.shop_id];
    
    mysqlConnection.execute(query, values, (error, result) => {
        if (error){
            console.error('Error updating manager description:', error);
            return res.status(500).json({ error: 'Error updating manager profile' });
        }
        if(result.length > 0){
            res.status(200).json(result);
            res.status(200).json({message: "Manager profile updated"});
        }
        else{
            res.status(404).json({error: 'Manager not found'});
        }
    })
}

module.exports.deleteManagerAccount = (req, res) =>{
    const query = `DELETE FROM user WHERE role = 'Manager' AND shop_id = ?`;

    const values = [req.params.id];
    mysqlConnection.execute(query, values, (error, result) => {
        if(error){
            console.error ('Error deleting manager:', error);
            return res.status(500).json({ error: 'Error deleting manager' });
        }
        res.status(200).json({result: result});
        res.status(200).json({message: 'Manager deleted'});
    });
};

