class CustomerRating{
    constructor(customerRating_id,rating,rating_Description,user_id,shop_id){
        this.customerRating_id = customerRating_id;
        this.rating = rating;
        this.rating_Description = rating_Description;
        this.user_id = user_id;
        this.shop_id = shop_id;
    }
}
module.exports = CustomerRating