class User{
    constructor(user_id, last_Name, first_Name, email, password, contact_No,role, shop_id, manager_id){
        this.user_id = user_id;
        this.last_Name = last_Name;
        this.first_Name = first_Name;
        this.email = email;
        this.password = password;
        this.contact_No = contact_No;
        this.role = role;
        this.manager_id = manager_id;
        this.shop_id = shop_id;
    }
}
module.exports = User;