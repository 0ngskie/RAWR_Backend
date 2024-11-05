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
    })
}
