const customerRating = require('../model/customerRating')
const customer = require('../model/users')
const mysqlConnection = require('../mysql/mysqlConnection')

// Create

module.exports.createCustomerRating = (user_id, shop_id, rating_value, rating_comment, req,res) =>{
    const query =`INSERT INTO ratings 
                (user_id, shop_id, rating_value, rating_comment)
                VALUES (?, ?, ?, ?)`;
    const values = [user_id, shop_id, rating_value, rating_comment];
    
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error('Error executing query', error);
            res.status(500).send({message: 'Error creating customer rating'});
        } else{
            console.log('Customer rating created successfully');
            res.status(201).json({message: 'Customer rating created successfully',...req.body, id:  result.insertId });
        }
    });
};

// Read
module.exports.displayAllComments = (req,res)=>{
    const query = `SELECT * FROM ratings`;
    mysqlConnection.query(query, (error, result) => {
        if(error){
            console.error('Error executing query', error);
            res.status(500).send({message: 'Error fetching all customer ratings'});
        } else{
            res.status(200).json({message: 'Succesfull Display of Customer Ratings',result: result});
        }
    });
};

module.exports.displayShopCustomerRating = (req,res)=>{

    const shop_id = req.params.shop_id;
    console.log('Received request for shop_id:', req.params.shop_id);
    const query = `SELECT r.rating_value, r.rating_comment, u.last_Name, r.shop_id FROM ratings r JOIN users u ON r.user_id = u.user_id WHERE r.shop_id = ?;`;

    const values = [shop_id];
    mysqlConnection.query(query,values, (error, result) => {
        if(error){
            console.error('Error executing query', error);
            res.status(500).send({message: 'Error fetching customer Ratings'});
        } else{
            res.status(200).json({message: 'Succesfull Display of Customer Rating',result: result});
        }
    });
};

// Update
module.exports.updateCustomerRating = (req,res)=>{
    const{rating, ratingDescription} = req.body;
    const {user_id, shop_id} = req.params;

    const query = `UPDATE ratings SET rating_value =?, rating_comment = ?
                    WHERE user_id =? AND shop_id = ?`;
    
    const values = [rating, ratingDescription, user_id, shop_id];
    mysqlConnection.execute(query,values, (error, result)=>{
        if(error){
            console.error('Error executing query', error);
            res.status(500).send({message: 'Error Updating customer Rating'});
        } else{
            console.log('Updated customer rating');
            res.status(200).json({result: result});
        }
    });
};

// Delete
module.exports.deleteCustomerRating = (req,res)=>{

    const{customerRating_id} = req.body;
    const query =`DELETE FROM ratings WHERE rating_id = ?`;
    const values = [customerRating_id];

    mysqlConnection.execute(query,values, (error,result) =>{
        if(error){
            console.error('Error executing query for deleting the customer Rating', errors);
            res.status(500).send({message: 'Error deleting customer Rating'});
        }else{
            res.status(200).json({message: 'Successfully deleted the customer Rating', result: result});
        }
    });
};