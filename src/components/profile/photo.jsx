import React, { Component } from 'react'
import { connect } from 'react-redux'
import PhotoItem from './photo-item';
import Dropzone from 'react-dropzone';
import {ReactComponent as Upload} from './svg/upload.svg';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 
import {uploadPhoto,updateUserPhoto} from '../../store/actions/profileActions'

export class photo extends Component {
    state={
        files:[],
        fileName:'',
        cropResult:null,
        image:{}
    }

    

    fileUploadHandle=(files)=>{
        
       const filesWithPreview= files.map(file=>{
           return Object.assign(file,{
                preview: URL.createObjectURL(file)
              })
        })
        this.setState({
            files:filesWithPreview,
            fileName:files[0].name
        })
    }

    cropImage=()=>{
        if(typeof this.refs.cropper.getCroppedCanvas() === 'undefined'){
            return;
        }
        this.refs.cropper.getCroppedCanvas().toBlob(blob=>{
            let picUrl=URL.createObjectURL(blob);
            this.setState({
                cropResult:picUrl,
                image:blob
            })
        },'image/jpeg');
    }

    uploadImage=()=>{
       
        this.props.onUploadImage(this.state.image,this.props.id,this.state.fileName);
        // this.props.onDeneme(this.state.photoUrl);
    }

    render() {
        const{mainPhoto}=this.state;
        const {photoUrl}=this.props;
        return (
            <div className='photo'>
            <h2>Photos</h2>

            <div className="photo__part-1">
            <h3>Step 1 : Add A Photo</h3>

            <Dropzone onDrop={this.fileUploadHandle} multiple={false}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Upload/>
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
             </Dropzone>

                
               
            </div>

            <div className="photo__part-2">
                <h3>Step 2 : Resize</h3>
            {this.state.files[0] && 
                <Cropper
                style={{height:150,width:150}} 
                ref='cropper'
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode='move'
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
                />
            }
            </div>

            <div className="photo__part-3">
                <h3> Step 3 : Preview &amp; Upload</h3>
                {this.state.files[0] && <img src={this.state.cropResult} alt="dropped_image"/>}
                {this.state.files[0] && <div className='photo__part-3__upload' onClick={this.uploadImage}>Upload</div>}
            </div>
                <div className="photo__part-4">
                    <h3>My Photos</h3>
                {photoUrl && photoUrl.map((photo,index)=>{
                    return <PhotoItem key={index} photo={photo} mainPhoto={mainPhoto} />
                })}
                </div>
        </div>
        )   
    }
}

const mapStateToProps = (state) => ({
    id:state.auth.user.id,
    photoUrl:state.auth.user.photos
})

const mapDispatchToProps =dispatch=> {
    
       return{
        onUploadImage:(file,userId,fileName)=>{dispatch(uploadPhoto(file,userId,fileName))},
        onDeneme:(url)=>{dispatch(updateUserPhoto(url))}
       }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(photo)
