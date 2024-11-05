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

module.exports.getRepairShops = (req, res) => {
    const{shop_Name,shop_Address, description, shop_Mobile_No, shop_Landline_No, shop_Page_Payment_Method, shop_Page_Registration_Status} = req.body;
    const query = `SELECT * FROM repairshop`;
    const values = [shop_Name, shop_Address, description, shop_Mobile_No, shop_Landline_No, shop_Page_Payment_Method, shop_Page_Registration_Status];

    mysqlConnection.execute(query,values, (error, result) => {
        if(error){
            console.error('Error getting repairshops:', error);
            return res.status(500).json({error: 'Error getting repairshops'});
        }
        res.status(200).json(result);
    });
};

// Update

module.exports.updateRepairShop = (req, res) => {
    const {shop_Name, shop_Address, shop_Email, shop_Mobile_No, shop_Landline_No, shop_Coordinates, shop_Description} = req.body;

    const query = `UPDATE shop SET shop_Name = ?, shop_Address = ?, shop_Email = ?, shop_Mobile_Num = ?, shop_Landline_Num = ?, shop_Coordinates = ?, shop_Description = ? WHERE shop_id = ?`;

    const values = [shop_Name, shop_Address, shop_Email, shop_Mobile_No,shop_Landline_No,shop_Coordinates,shop_Description, req.params.id];
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
    const query = `DELETE FROM shop WHERE shop_id = ?`;

    const values = [req.params.id];
    mysqlCon.query(query, values, (error, result) => {
        if(error){
            console.error('Error deleting repairshop:', error);
            return res.status(500).json({error: 'Error deleting repairshop'});
        }
        res.status(200).json({result: result});
        res.status(200).json({message: 'Repairshop deleted'});
    });
};