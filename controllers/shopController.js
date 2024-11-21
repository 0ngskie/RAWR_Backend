const customerRating = require('../model/customerRating')
const Shop = require('../model/shops')
const user =require('../model/users')
const mysqlConnection = require('../mysql/mysqlConnection')

// Create
module.exports.registerRepairShop = (req, res) => {
    const {shop_Name, shop_Address, shop_Document_Filepath} = req.body;

    //Replaced "shops" to match database table name
    const query = `INSERT INTO shops (shop_Name, shop_Address, shop_Document_FilePath, shop_Registration_Status) 
                   VALUES (?,?,?,"Pending")`; //Added quotations to "Pending"

    const values = [shop_Name, shop_Address, shop_Document_Filepath];
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error('Error creating repairshop:', error);
            return res.status(500).json({error: 'Error registering repairshop'});
        }
        res.status(200).json({result: result, message: 'Repairshop is under review'}); //Combined the two responses to avoid this error: code: 'ERR_HTTP_HEADERS_SENT' 
    });
};

// Read
module.exports.viewRepairShopDetails = (req, res) => { //For Admin
    const {shop_id} = req.body;
    
    const query = `SELECT 
                    s.shop_Name,
                    u.last_Name AS owner_lastName,
                    u.first_Name AS owner_firstName,
                    s.shop_Address,
                    s.created_at,
                    s.shop_Document_FilePath,
                    s.shop_Registration_Status
                    FROM shops s
                    LEFT JOIN users u ON s.shop_id = u.shop_id
                    WHERE
                    s.shop_id =?`; //Fixed query: "created_at"

    const values = [shop_id];

    mysqlConnection.query(query, values, (error, result) =>{
        if(error){
            console.error('Error getting repairshop details:', error);
            return res.status(500).json({error: 'Error getting repairshop details from server'});
        }
        res.status(200).json({message: "Repairshop details retrieve from server ", result: result});
    });
};

module.exports.viewShopRegistrationStatus = (req, res) => { //Mostly for Testing purposes
    const {shop_id} = req.body; //Removed shop_Registration_Status from the request body

    const Query = `SELECT shop_Registration_Status FROM shop = ?`;


    const values = [shop_id, shop_Registration_Status];

    mysqlConnection.query(Query, values, (error, result) => {
        if(error){
            console.error('Error getting shop registration status:', error);
            return res.status(500).json({error: 'Error getting shop registration status from server'});
        }
        res.status(200).json({message: "Repairshop registration status retrieve from server ", result: result});
    });
};

module.exports.validateShopPageStatus = (req,res) => { //Changed WHERE clause to only use "shop_id"
    const{shop_id} = req.body;
    const checkQuery =`SELECT shop_id, shop_Page_Status FROM shops WHERE shop_id = ?`;
    const checkValues = [shop_id];

    mysqlConnection.query(checkQuery, checkValues, (checkError,checkResult) =>{
        if(checkError){
            console.error('Error getting shop status:', error);
            return res.status(500).json({error: 'Error getting shop status from server'});
        }
        if(checkResult.length > 0){
            res.status(200).json({result: checkResult, message: 'Shop Page status is found and dispatched successfully'}); //Combined the two responses to avoid this error: code: 'ERR_HTTP_HEADERS_SENT' 
        }
    }); //Note: Make sure to not leave any shop status's as null. Default them as 'Private'
};

module.exports.locateRepairShop = (req,res) => { //Changed locateRepairShop to use the shop_Page_Status in the WHERE clause instead of using the validateShopPageStatus
    const{shop_Name, shop_Address,shop_Coordinates,shop_Page_Payment_Method} = req.body;

    const query = `
    SELECT shop_id, shop_Name, shop_Address, shop_Coordinates, shop_Page_Status 
    FROM shops 
    WHERE shop_Page_Status = "Public" 
    AND (
        shop_Name = ? 
        OR shop_Address = ? 
        OR shop_Coordinates = ? 
        OR shop_Page_Payment_Method = ? 
    )`; //Updated the query
    const values = [shop_Name, shop_Address, shop_Coordinates, shop_Page_Payment_Method];

    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error('Error locating repairshop:', error);
            return res.status(500).json({error: 'Error locating repairshop'});
            
        }
        if (result.length > 0) {
            return res.status(200).json({ message: 'Shop found:', result }); //Combined the two responses to avoid this error: code: 'ERR_HTTP_HEADERS_SENT' 
        } else {
            return res.status(404).json({ message: 'No shops found matching the criteria.' }); //Added a response for when no public shops are found with the request
        }
        
    });
};

module.exports.displayShopPage = (req, res) => {
    const{shop_id} = req.body;
    const query = `SELECT 
            s.shop_Name, 
            s.shop_Address,
            s.shop_AboutUs,
            s.shop_Service_Offer,
            s.shop_Mobile_No,
            s.shop_Landline_No,
            s.Shop_Page_Payment_Method,
            s.Shop_Page_Status
            FROM shops s
            WHERE s.shop_id =?
            `; //Removed Customer Ratings, Rating and User joins. Use displayShopCustomerRating from the customerRatingController

    const values = [shop_id];

    mysqlConnection.query(query,values, (error, result) => {
        if(error){
            console.error('Error getting repairshops:', error);
            return res.status(500).json({error: 'Error getting shop details from server'});
        }
        res.status(200).json({message: 'Shop Page is found and dispatched successfully', result: result});
    });
};

// Update
module.exports.updateShopRegistrationStatus = (req,res) =>{
    const{shop_id, shop_Registration_Status} = req.body;

    const query =` UPDATE shops SET shop_Registration_Status = ?, updated_At = CURRENT_TIMESTAMP where shop_id = ?`;

    const values = [shop_Registration_Status, shop_id]; //Removed updated_At and swapped the places of the variables
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error('Error updating repairshop registration status:', error);
            return res.status(500).json({error: 'Error updating repairshop registration status'});
        }
        res.status(200).json({message: 'Repairshop registration status updated', result: result});
    });
};

module.exports.updateShopRegistrationDetails = (req, res) =>{ //If Rejected, use this when reapplying a shop
    const{shop_id, shop_Name,shop_Address, shop_Document_Filepath} = req.body;

    const query = `UPDATE shops SET shop_Name = ?, shop_Address = ?, shop_Document_Filepath = ?, shop_Registration_Status = "Pending", updated_At = CURRENT_TIMESTAMP
    WHERE shop_id = ?`; //shop_Registration_Status is changed to 'Pending' and updated_At is changed to the current date

    const values = [shop_Name, shop_Address, shop_Document_Filepath, shop_id];
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error('Error updating repairshop registration details:', error);
            return res.status(500).json({error: 'Error updating repairshop registration details'});
        }
        res.status(200).json({message: 'Repairshop registration details updated', result: result});
    });
};

module.exports.updateShopPage = (req, res) => { //Added more values that can be updated by the shop owner
    const {shop_Name, shop_Email, shop_Address, shop_AboutUs, shop_Service_Offer, shop_Mobile_No, shop_Landline_No, Shop_Page_Payment_Method, shop_Page_Status, shop_id} = req.body;

    const query = `UPDATE shops SET shop_Name = ?, shop_Email = ?, shop_Address = ?, shop_AboutUs = ?, shop_Service_Offer = ?, shop_Mobile_No = ?, shop_Landline_No = ?, 
    Shop_Page_Payment_Method = ?, shop_Page_Status = ? WHERE shop_id = ?`;

    const values = [shop_Name, shop_Email, shop_Address, shop_AboutUs, shop_Service_Offer, shop_Mobile_No, shop_Landline_No, Shop_Page_Payment_Method, shop_Page_Status, shop_id];
    mysqlConnection.query(query, values, (error, result) => {

        if(error){
            console.error('Error updating repairshop:', error);
            return res.status(500).json({error: 'Error updating repairshop'});
        }
        res.status(200).json({message: 'Repairshop updated', result});
    });
};

// Delete
module.exports.deleteRepairShop = (req, res) => {
    
    const{shop_id} = req.body;
    const query = `DELETE FROM shops WHERE shop_id = ?`;

    const values = [shop_id,req.params.shop_id];
    mysqlConnection.query(query, values, (error, result) => {
        if(error){
            console.error('Error deleting repairshop:', error);
            return res.status(500).json({error: 'Error deleting repairshop'});
        }
        res.status(200).json({message: 'Repairshop deleted', result: result});
    });
};

