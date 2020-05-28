import firebase from 'firebase';
import {compareArray} from '../../config/utils'
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

export const updateAboutMe=(task,info)=>{
   switch (task) {
       case 'bio':
           
        return{
            type:'UPDATE_ABOUT_ME_BIO',
            bio:info
        }
        case 'job':
        return{
            type:'UPDATE_ABOUT_ME_JOB',
            job:info
        }
        case 'interest':
            return{
                type:'UPDATE_ABOUT_ME_INTEREST',
                interest:info
            }
       default:
           return{
               type:'UPDATE_ABOUT_ME'
           }
   }
}

export const updateAboutMeClick =(bio,job,interest,id)=>{
    return async dispatch=>{
              let task,info;  
        try {
            let userData= firestore.doc(`user/${id}`).get().then(
                doc=>{
                    return doc.data()
                }
            );
            
            let dataBio= userData.bio;
            let dataJob= userData.job;
            let dataInterest= userData.interest;

                if(dataBio !== bio){
                    task='bio';
                    info=bio;
                    await firestore.doc(`user/${id}`).update({
                        bio:bio
                    }).then(
                        
                        dispatch(updateAboutMe(task,info))
                    )
                }
                if(dataJob !== job){
                    task='job';
                    info=job;
                    await firestore.doc(`user/${id}`).update({
                        job:job
                    }).then(
                        dispatch(updateAboutMe(task,info))
                    )
                }
                if(dataInterest === undefined){
                    task='interest';
                    info=interest;
                    await firestore.doc(`user/${id}`).update({
                        interest:interest
                    })
                }else{if(!compareArray(dataInterest,interest)){
                    task='interest';
                    info=interest;
                    await firestore.doc(`user/${id}`).update(
                        {interest:interest}
                    ).then(
                        dispatch(updateAboutMe(task,info))
                    )
                }
        }
                
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteContact=(elm)=>{
    return{
        type:'DELETE_CONTACT',
        elm:elm
    }
}


export const deleteContactClick=(elm,id)=>{

    return async dispatch=>{
        await firestore.doc(`user/${id}`).update({
            contact:firebase.firestore.FieldValue.arrayRemove(elm)
        }).then(
            dispatch(deleteContact(elm))
        )
    }

}

export const addContact=(elm)=>{
    return{
        type:'ADD_CONTACT',
        elm:elm
    }
}

export const addContactClick=(elm,id)=>{
    return async dispatch=>{
        await firestore.doc(`user/${id}`).update({
            contact:firebase.firestore.FieldValue.arrayUnion(elm)
        }).then(
            dispatch(addContact(elm))
        ).catch(err=>{
            console.warn(err)
        })
    }
}