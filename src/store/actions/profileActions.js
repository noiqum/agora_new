import firebase from 'firebase/app';
import { toastr } from 'react-redux-toastr';

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
            if(basicData.name !==''){
                await firestore.collection('user').doc(id)
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
            
        } catch (error) {
            
        }
    }

}

