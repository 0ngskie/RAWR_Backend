class CustomerRating{
    constructor(customerRating_id,rating_value,rating_comment,user_id,shop_id){
        this.customerRating_id = customerRating_id;
        this.rating_value = rating_value;
        this.rating_comment = rating_comment;
        this.user_id = user_id;
        this.shop_id = shop_id;
    }
}
module.exports = CustomerRating;