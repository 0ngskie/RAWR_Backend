class Schedule{
    constructor(schedule_id,schedule_Name,schedule_Description,schedule_StartDate,schedule_EndDate,user_id,vehicle_id,shop_id){
        this.schedule_id = schedule_id;
        this.schedule_Name = schedule_Name;
        this.schedule_Description = schedule_Description;
        this.schedule_StartDate = schedule_StartDate;
        this.schedule_EndDate = schedule_EndDate;
        this.user_id = user_id;
        this.vehicle_id = vehicle_id;
        this.shop_id = shop_id;
    }
}
module.exports = Schedule