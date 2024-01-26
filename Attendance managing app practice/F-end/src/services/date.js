exports.formattedDate = (milliSec) => {

    if(!milliSec){
        return "Checkout pending"
    }
    const monthsArr = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
        'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
      
    const d = new Date(milliSec);
    const date = d.getDate();
    const month = d.getMonth();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    const year = d.getFullYear();
    

    let meridiem;

    if(hours >= 12){
        if(hours !== 12){
            hours = hours - 12;
        }
        meridiem = "PM";
    } else{
        if(hours === 0){
            hours = 12
        }        
        meridiem = "AM";  
    };

    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    

    return(`${date} ${monthsArr[month]} ${year} - ${hours}:${minutes}:${seconds} ${meridiem}`);

};

exports.checkOutValidator = (checkInTime,checkOutTime) => {
    const diff = checkOutTime - checkInTime;
    return (diff < 3600000);
};

exports.getTimeAgo = (milliSec) => {
    const currMilSec = new Date().getTime();
    const timeElapsed = currMilSec - milliSec;

    const timeAgo = new Date(timeElapsed);

    let minutes = timeAgo.getMinutes();
    let hours = timeAgo.getHours() - 5; //-5 bcz of gmt +5
    let date = timeAgo.getDate() - 1; //this much days ago,,,,, -1 bcz it starts with 1
    let month = timeAgo.getMonth() + 1; //+1 bcz months starts from 0

    console.log(timeAgo);

    if(minutes == 0 && hours < 1){
        return 'few seconds';
    }

    if(minutes < 59 && hours == 0){       
        return `${minutes} minute(s)`;
    }

    if(hours < 23 && date < 1){
        return `${hours} hour(s)`;
    } 

    if(date > 1 && date <= 31){
        return `${date} days(s)`;       
    }

    if(month > 1){          
        return `${month} month(s)`;
    }
}