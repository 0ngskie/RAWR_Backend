class Shop{
    constructor(shop_id, shopName, 
                shop_Email,shop_Address,
                shop_Coordinates,shop_AboutUs,
                shop_Service_Offer,shop_Mobile_No,
                shop_Landline_No, shop_Document_Filepath,
                shop_Profile_Filepath, shop_Page_Payment_Method, 
                shop_Page_Status, shop_Registration_Status,
                created_At, updated_At)
                {
                    this.shop_id = shop_id;
                    this.shopName = shopName;
                    this.shop_Email = shop_Email;
                    this.shop_Address = shop_Address;
                    this.shop_Coordinates = shop_Coordinates;
                    this.shop_AboutUs = shop_AboutUs;
                    this.shop_Service_Offer = shop_Service_Offer;
                    this.shop_Mobile_No = shop_Mobile_No;
                    this.shop_Landline_No = shop_Landline_No;
                    this.shop_Document_Filepath = shop_Document_Filepath;
                    this.shop_Profile_Filepath = shop_Profile_Filepath;
                    this.shop_Page_Payment_Method = shop_Page_Payment_Method;
                    this.shop_Page_Status = shop_Page_Status;
                    this.shop_Registration_Status = shop_Registration_Status;
                    this.created_At = created_At;
                    this.updated_At = updated_At;
                }
}
module.exports = Shop