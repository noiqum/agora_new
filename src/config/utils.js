 export const birthdayConvert=(birthday)=>{
    let arr =birthday.split('-');
    const [year,month,day]=arr;
    let result =`${day}-${month}-${year}`;
    return result;
    
    
}



