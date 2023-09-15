
//2023-09-08T08:40:00.000Z
export const formatDate = (datetime) =>{
    
    if(datetime === null){
        return "----"
    }
    const arr = datetime.split("T");
    const date = arr[0];
    const time = arr[1].slice(0,5);
    return date + " " + time;

}