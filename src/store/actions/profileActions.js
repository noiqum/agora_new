import firebase from 'firebase/app';
import { toastr } from 'react-redux-toastr';
import {birthdayConvert} from '../../config/utils';

const firestore=firebase.firestore();

export const updateDisplayname=(newName)=>{
    return{
        type:'UPDATE_DISPLAYNAME',
        newName:newName,
    }
}



export const updateProfile=(basicData,id)=>{

    return async dispatch=>{
        try {
            let docRef=firestore.collection('user').doc(id);
            if(basicData.name !==''){
                await docRef
                .update({
                    displayName:basicData.name
                }).then(
                    dispatch(updateDisplayname(basicData.name,id))
                )
                .then(
                    toastr.success('success','name updated')
                ).catch(err=>{
                    toastr.warning('error',`error:${err.message}`)
                })
            }
            if(basicData.gender !==null){
                await docRef.set({
                    gender:basicData.gender
                },{merge:true})
                .then(
                    toastr.success('success','gender info noted')
                )
            }
            if(basicData.birthday !== ''){
                let convertedBirthday=birthdayConvert(basicData.birthday)
                await docRef.set({
                    birthday:convertedBirthday
                },{merge:true})
                .then(
                    toastr.success('success','birthday info updated')
                )
            }

        } catch (error) {
            
        }
    }

}

