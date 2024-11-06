const Shop = require('models/shops');
const mysqlConnection = require('mysql/mysqlConnection');


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

module.exports.validateShopPageStatus = (req,res)=>{
    const{shop_Page_Status} = req.body;
    const checkQuery =`SELECT shop_Page_Status FROM shops WHERE shop_Name = ? OR shop_Address = ?`;
    const checkValues = [shop_Page_Status, req.params.shop_Name, req.params.shop_Address];

    mysqlConnection.execute(checkQuery, checkValues, (checkError,checkResult) =>{
        if(checkError){
            console.error('Error getting shop status:', error);
            return res.status(500).json({error: 'Error getting shop status from server'});
        }
        if(checkResult.length > 0){
            res.status(200).json({message: 'Shop Page status is found and dispatched successfully'});
            res.status(200).json({result: checkResult});
        };
    });
};

module.exports.locateRepairShop = (req,res) => {
    const{shop_Name, shop_Address,shop_Coordinates,shop_Page_Payment_Method} = req.body;
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
};

module.exports.displayShopPage = (req, res) => {
    //TODO find a way to display Comment (bro... just use JOIN LOL) (Thanks Personality 2 <3)
    const{shop_Name,shop_Address, shop_AboutUs,shop_Service_Offer, shop_Mobile_No, shop_Landline_No,shop_Picture_Filepath, shop_Page_Payment_Method} = req.body;
    const query = `SELECT shop_Name, shop_Address, shop_About_Us, shop_Service_Offer, shop_Mobile_No, shop_Picture_Filepath, shop_Page_Payment_Method FROM shops`;
    const values = [shop_Name, shop_Address, shop_AboutUs, shop_Service_Offer, shop_Mobile_No, shop_Landline_No, shop_Picture_Filepath, shop_Page_Payment_Method];

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
    const {shop_Name, shop_Address, shop_Email, shop_Mobile_No, shop_Landline_No, shop_Description} = req.body;

    const query = `UPDATE shop SET shop_Name = ?, shop_Address = ?, shop_Email = ?, shop_Mobile_No = ?, shop_Landline_No = ?, shop_Coordinates = ?, shop_Description = ? WHERE shop_id = ?`;

    const values = [shop_Name, shop_Address, shop_Email, shop_Mobile_No,shop_Landline_No,shop_Description, req.params.id];
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

// Under Progress
module.exports.deleteRepairShop = (req, res) => {
    const query = `DELETE FROM shop WHERE shop_id = ?`;

    const values = [req.params.id];
    mysqlConnection.execute(query, values, (error, result) => {
        if(error){
            console.error('Error deleting repairshop:', error);
            return res.status(500).json({error: 'Error deleting repairshop'});
        }
        res.status(200).json({result: result});
        res.status(200).json({message: 'Repairshop deleted'});
    });
};