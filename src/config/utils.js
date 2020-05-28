 export const birthdayConvert=(birthday)=>{
    let arr =birthday.split('-');
    const [year,month,day]=arr;
    let result =`${day}-${month}-${year}`;
    return result;
    
    
}


export const ageCalculate=(str)=>{

 if(str !== '') {
    let converted=str.split('-');
  
    const [day,month,year]=converted;
   
    const yearPresent=new Date().getFullYear();
    
    let age=yearPresent-year;
   
    return age;
 }else{
     return;
 }
  

}

export const compareArray=(first,second)=>{

    if(first.length !== second.length){
        return false;
    }
    else{
     
     for(let i=0;i < first.length;i++){
        return (first[i] !== second[i]) ? false : true;
        }
    
    }
    return true;
}

export const convertToArray =(str)=>{
    return str.split(',');
}

