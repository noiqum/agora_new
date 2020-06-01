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

export const validateState=(obj)=>{
    let values=Object.values(obj);
    let valid=values.some(elm=>{
       return elm === '';
    })
    console.log(valid)
    if(valid){
        return false
    }
    else{
        return true
    }
}

export const defaultImage='https://firebasestorage.googleapis.com/v0/b/agora-event-platform.appspot.com/o/userPlaceHolder.png?alt=media&token=9b6cc96e-a380-4d30-9060-72cc0294ce89';

export const checkValidity=(elm)=>{
    let valid=true;
    if(elm === '' || elm === undefined){
        return valid=false
    }else{
        return valid
    }
    
}

export const renderUtil=(piece,label)=>{
    if(checkValidity(piece)){
        return `${label}:${piece}`
    }
    else {
        return null
    }
}