const customerRating = require('models/customerRating')
const Shop = require('models/shops')
const customer =require('models/users')
const mysqlConnection = require('mysql/mysqlConnection')



// Create
module.exports.registerRepairShop = (req, res) => {
    const {shop_Name, shop_Address, shop_Document_Filepath} = req.body;

    const query = `INSERT INTO repairshop (shop_Name, shop_Address, shop_Document_FilePath) 
                   VALUES (?,?,?)`;
                   
    const values = [shop_Name, shop_Address, shop_Document_Filepath];
    mysqlConnection.execute(query, values, (error, result) => {
        if(error){
            console.error('Error creating repairshop:', error);
            return res.status(500).json({error: 'Error registering repairshop'});
        }
        res.status(200).json({result: result});
        res.status(200).json({message: 'Repairshop is under review'});
    });
};

// Read
module.exports.validateShopPageStatus = (req,res) => {
    const{shop_id, shop_Page_Status, shop_Name, shop_Address} = req.body;
    const checkQuery =`SELECT shop_Page_Status FROM shops WHERE shop_Name = ? OR shop_Address = ?`;
    const checkValues = [shop_id, req.shop_id, shop_Page_Status, shop_Name, req.params.shop_Name, shop_Address, req.params.shop_Address];

    mysqlConnection.execute(checkQuery, checkValues, (checkError,checkResult) =>{
        if(checkError){
            console.error('Error getting shop status:', error);
            return res.status(500).json({error: 'Error getting shop status from server'});
        }
        if(checkResult.length > 0){
            res.status(200).json({message: 'Shop Page status is found and dispatched successfully'});
            res.status(200).json({result: checkResult});
        }
    });
};

module.exports.locateRepairShop = (req,res) => {
    const{shop_Name, shop_Address,shop_Coordinates,shop_Page_Payment_Method} = req.body;
    const{shop_Page_Status} = req.body;
    this.validateShopPageStatus(shop_Page_Status);
    if(shop_Page_Status === 'Public'){

        const query = `SELECT shop_Name, shop_Address, shop_Coordinates FROM shop WHERE shop_Name = ? OR shop_Address = ? OR shop_Page_Payment_Method = ?`;
        const values = [shop_Name, shop_Address, shop_Coordinates, shop_Page_Payment_Method, req.params.shop_Name, req.params.shop_Address, req.params.shop_Page_Payment_Method];

        mysqlConnection.execute(query, values, (error, result) => {
            if(error){
                console.error('Error locating repairshop:', error);
                return res.status(500).json({error: 'Error locating repairshop'});
            
            }
            res.status(200).json({message : 'Shop found:'});
            res.status(200).json(result);
        
        });
    }else{
        res.status(200).json({message: 'Shop is found but is set to Private by Owner/Manager'});
    }
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
            s.Shop_Page_Status,
            r.rating_value,
            r.rating_comment,
            u.last_Name AS customer_name
            FROM shops s
            LEFT JOIN ratings r ON s.shop_id = r.shop_id
            LEFT JOIN users u ON r.user_id = u.user_id
            WHERE s.shop_id =?
            `;

    const values = [shop_id];

    mysqlConnection.execute(query,values, (error, result) => {
        if(error){
            console.error('Error getting repairshops:', error);
            return res.status(500).json({error: 'Error getting shop details from server'});
        }
        res.status(200).json({message: 'Shop Page is found and dispatched successfully'});
        res.status(200).json({result: result});
    });
};

// Update


module.exports.updateShopPage = (req, res) => {
    const {shop_id, shop_Name, shop_Address, shop_Email, shop_Mobile_No, shop_Landline_No, shop_Description} = req.body;

    const query = `UPDATE shop SET shop_Name = ?, shop_Address = ?, shop_Email = ?, shop_Mobile_No = ?, shop_Landline_No = ?, shop_Coordinates = ?, shop_Description = ? WHERE shop_id = ?`;

    const values = [shop_id, shop_Name, shop_Address, shop_Email, shop_Mobile_No,shop_Landline_No,shop_Description, req.params.shop_id];
    mysqlCon.query(query, values, (error, result) => {
        if(error){
            console.error('Error updating repairshop:', error);
            return res.status(500).json({error: 'Error updating repairshop'});
        }
        res.status(200).json(result);
        res.status(200).json({message: 'Repairshop updated'});
    });
};

// Delete
module.exports.deleteRepairShop = (req, res) => {
    
    const{shop_id} = req.body;
    const query = `DELETE FROM shop WHERE shop_id = ?`;

    const values = [shop_id,req.params.shop_id];
    mysqlConnection.execute(query, values, (error, result) => {
        if(error){
            console.error('Error deleting repairshop:', error);
            return res.status(500).json({error: 'Error deleting repairshop'});
        }
        res.status(200).json({result: result});
        res.status(200).json({message: 'Repairshop deleted'});
    });
};

