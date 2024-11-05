const User = require("../models/users")
const mysqlCon = require('../mysql/mysqlConnection')

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