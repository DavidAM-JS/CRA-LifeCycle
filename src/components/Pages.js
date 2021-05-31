import React from 'react';

const Page = (props) =>{
    return(
        <div className="py-3 text-center">
            <button onClick={props.previousPage} type="button" className="btn btn-info">Previous</button>
            <button onClick={props.nextPage} type="button" className="btn btn-info mx-4">Next</button>
        </div>
    )
}

export default Page;