import React, {Component} from 'react';

class Searcher extends Component{
    searchRef = React.createRef();

    handleForm = (event) =>{
        event.preventDefault();
        const input = this.searchRef.current.value;
        this.props.searchData(input);
        this.searchRef.current.value = '';
    }

    render(){
        return (
            <form onSubmit={this.handleForm} className="text-center">
                <div className="row justify-content-md-center">
                    <div className="mx-4 form-group col-md-8">
                        <input type="text" className="form-control form-control-lg" placeholder="Search" ref={this.searchRef}/>
                    </div>
                    <div className="form-group col col-lg-2">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Search"/>
                    </div>
                </div>
            </form>
        )
    }
}

export default Searcher;