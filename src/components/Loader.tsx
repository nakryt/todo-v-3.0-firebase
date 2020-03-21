import React from "react"

type TProps = {
    size?: number
}

const Loader: React.FC<TProps> = ({size}) => {

    return (
        <div className='text-center'>
            <div className="spinner-border text-primary" role="status" style={{ width: `${size}rem`, height: `${size}rem`}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};

export default Loader;
