import {Link } from 'react-router-dom'


function LinkButton({children}) {
    return (
        <Link to="" className="BackButton">
            {children}
        </Link>
    )
}

export default LinkButton