const fns = require('date-fns');
const fnsTimezone = require('date-fns-tz');

module.exports = {
    now(timeZone = null){
        if(timeZone == null){
            timeZone = 'Asia/Manila';
        }
        let zonedDate = fnsTimezone.utcToZonedTime(new Date(), timeZone);
        return fns.format(zonedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: timeZone });
    }
}