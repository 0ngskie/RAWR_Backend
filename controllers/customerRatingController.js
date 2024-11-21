const customerRating = require('../model/customerRating')
const customer = require('../model/users')
const mysqlConnection = require('../mysql/mysqlConnection')

// Create

module.exports.createCustomerRating = ( req,res) =>{
    const{user_id, shop_id, rating_value, rating_comment,} = req.body;
    const query =`INSERT INTO ratings 
                (user_id, shop_id, rating_value, rating_comment, rating_status)
                VALUES (?, ?, ?, ?, 'public')`;
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


module.exports.getUserAverageRating = (req, res) => {
    const { user_id } = req.params;  // Get user_id from the request body

    // Query to calculate the average rating for the given user_id
    const query = `SELECT AVG(rating_value) AS average_rating FROM ratings WHERE user_id = ? AND rating_value BETWEEN 1 AND 5`;

    const values = [user_id];

    mysqlConnection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error calculating average rating:', error);
            return res.status(500).json({ message: 'Error calculating average rating' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No ratings found for this user' });
        }

        const averageRating = results[0].average_rating;

        // Return the average rating in the response
        return res.status(200).json({
            message: 'Average rating calculated successfully',
            average_rating: averageRating
        });
    });
};


// Update
module.exports.updateCustomerStatus = (req, res) => {
    console.log('Request Body:', req.body); // Debugging log
    
    const rating_id = req.params.id; // Rating ID from request parameters
    const { user_id, new_status } = req.body; // Destructure user_id and new_status
    
    if (!new_status) {
        return res.status(400).json({ error: 'new_status is required' });
    }

    const checkQuery = `SELECT rating_id FROM ratings WHERE rating_id = ? AND user_id = ?`;
    
    mysqlConnection.query(checkQuery, [rating_id, user_id], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking rating ownership:', checkError);
            return res.status(500).json({ error: 'Error checking rating ownership' });
        }

        if (checkResults.length === 0) {
            return res.status(404).json({ error: 'Rating not found or you are not authorized to update this rating' });
        }

        const updateQuery = `UPDATE ratings SET rating_Status = ? WHERE rating_id = ?`;
        const updateValues = [new_status, rating_id];

        console.log('Update query values:', { new_status, rating_id });

        mysqlConnection.query(updateQuery, updateValues, (updateError, updateResult) => {
            if (updateError) {
                console.error('Error updating rating:', updateError);
                return res.status(500).json({ error: 'Error updating rating' });
            }

            console.log('Update result:', updateResult);

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ error: 'Rating not found or no changes were made' });
            }

            console.log('Updated rating successfully:', {
                rating_id,
                user_id,
                new_status,
            });

            return res.status(200).json({ message: 'Rating updated successfully' });
        });
    });
};

// Delete
module.exports.deleteCustomerRating = (req, res) => {
    const { rating_id, user_id } = req.body; // Get the customerRating_id and user_id from the request body

    // Query to check if the rating exists and if the user is the owner of that rating
    const checkQuery = `SELECT user_id FROM ratings WHERE rating_id = ?`;
    const checkValues =[rating_id, user_id];

    mysqlConnection.query(checkQuery, checkValues, (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking rating ownership:', checkError);
            return res.status(500).send({ message: 'Error checking rating ownership' });
        }

        if (checkResults.length === 0) {
            // No rating found for the given rating_id
            return res.status(404).json({ message: 'Rating not found' });
        }

        const ratingOwnerId = checkResults[0].user_id; // Get the user_id of the rating owner

        // If the logged-in user is not the owner of the rating, prevent deletion
        if (ratingOwnerId !== user_id) {
            return res.status(403).json({ message: 'You are not authorized to delete this rating' });
        }

        // If the user is the owner of the rating, proceed with deletion
        const deleteQuery = `DELETE FROM ratings WHERE rating_id = ?`;
        mysqlConnection.query(deleteQuery, checkValues, (deleteError, deleteResult) => {
            if (deleteError) {
                console.error('Error deleting the customer rating:', deleteError);
                return res.status(500).json({ message: 'Error deleting customer rating' });
            }

            if (deleteResult.affectedRows === 0) {
                return res.status(404).json({ message: 'Rating not found or already deleted' });
            }

            return res.status(200).json({ message: 'Successfully deleted the customer rating', result: deleteResult });
        });
    });
};
