import React, {Component} from 'react';
import Image from './Image';
import Page from './Pages';

class ImagesList extends Component{

    componentWillUnmount(){
        console.log("List Unmount")
        this.props.updateImages();
    }
    
    showImages = () =>{
        const images = this.props.images
        if(images.length === 0) return null;

        return(
            <React.Fragment>
                <div className="text-center mt-3">Page: {this.props.page}/{this.props.totalPages}</div>
                <div className="text-center mt-3">You are positioned in image: {this.props.currentImage}/{this.props.totalImages}</div>
                <div className="col-12 p-5 row">
                    {images.map((image) => (
                        <Image key={image.id}
                               image={image}
                                />
                    ))}
                </div>
                <Page
                previousPage={this.props.previousPage}
                nextPage={this.props.nextPage}/>
            </React.Fragment>
        )
    }

    render(){
        return(
            <React.Fragment>
                {this.showImages()}
            </React.Fragment>
        )
    }
}

export default ImagesList;