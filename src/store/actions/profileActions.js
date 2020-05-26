import firebase from 'firebase';

import { toastr } from 'react-redux-toastr';
import {birthdayConvert} from '../../config/utils';

const firestore=firebase.firestore();
var storageRef = firebase.storage().ref();

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

export const updateUserPhoto=(photoObj)=>{
    return{
        type:'UPDATE_USER_PHOTO',
        photoObj:photoObj
    }
}

export const deleteUserPhoto=(photo)=>{
    return{
        type:'DELETE_USER_PHOTO',
        photo:photo
    }
}

export const uploadPhoto=(file,userId,fileName)=>{

    return async (dispatch)=>{
        
        const path=`${userId}/user_images/`;
        const userImageRef=storageRef.child(path+fileName);
        const metadata={
            
            contentType: 'image/jpeg'
        }
        try {
            toastr.info('loading','your image is loading')
            let downloadUrl;
            await userImageRef.put(file,metadata).then(
                res=>res.ref.getDownloadURL()
                .then( result=>{
                    downloadUrl=result;
                })
            )
            
            let userData=  await firestore.collection('user').doc(userId).get()
                                .then(doc=>{
                                    return doc.data();   
                                })
            let userPhotos= userData.photos;
             if(userPhotos === undefined){
                firestore.collection('user').doc(userId).set({
                    photos:{downloadUrl:downloadUrl,fileName:fileName}
                },{merge:true}).then(dispatch(updateUserPhoto({downloadUrl,fileName})))
                
            }
            if(userPhotos !== undefined){
                firestore.doc(`user/${userId}`).update(
                    {photos:firebase.firestore.FieldValue.arrayUnion({downloadUrl:downloadUrl,fileName:fileName})}
                ).then(dispatch(updateUserPhoto({downloadUrl,fileName})))
                

            }

            
            
        } catch (error) {
            console.log(error)
        }

    }

}
export const mainPhotoUpdate=(photo)=>{
    return{
        type:'MAIN_PHOTO_UPDATE',
        photo:photo
    }
}

export const mainPhotoPick=(photo,userId)=>{
    
    return  async dispatch=>{
        try {
            let userDetail= await firestore.doc(`user/${userId}`).get().then(
                doc=>{
                   return doc.data()
                }
            )
            let userMainPhoto = userDetail.mainPhoto;
            if(userMainPhoto === undefined){
               await firestore.doc(`user/${userId}`).set({
                    mainPhoto:photo
                },{merge:true}).then(
                    dispatch(mainPhotoUpdate(photo))
                )
            }
            if(userMainPhoto !== undefined){
               await firestore.doc(`user/${userId}`).update(
                    {mainPhoto:photo}
                ).then(
                    dispatch(mainPhotoUpdate(photo))
                )
            }

            
        } catch (error) {
            console.error(error)
        }

    }
}

export const deletePhoto=(photo,userId,fileName)=>{
    return async dispatch =>{

        const path=`${userId}/user_images/`;
        const userImageRef=storageRef.child(path+fileName);
        try {
             await userImageRef.delete().then(
                 ()=>{
                     toastr.success('success','photo deleted')
                 }
             ).catch(
                 (err)=>console.log(err)
             )
            await firestore.doc(`user/${userId}`).update(
                {photos:firebase.firestore.FieldValue.arrayRemove(photo)}
            ).then(dispatch(deleteUserPhoto(photo)))
            .catch(err=>{
                console.log(err)
            })

        } catch (error) {
            console.log(error)
        }
    }
}