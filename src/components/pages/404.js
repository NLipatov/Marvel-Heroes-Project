import {Link} from 'react-router-dom';
import deadpool from "../../resources/img/deadpool.png"

const Page404 = () => {
    return(
        <div style={{"marginTop": "20%"}}>
            <img style={{"maxWidth": "20%", "position": "fixed", "bottom": "0", "right": "0"}} src={deadpool}/>
            <h3 style={{"textAlign": "center", "fontWeight": "bold", 
            "fontSize": "24px"}}>
                Well, we can't show you this page. U r not cool enough
                </h3>

            <div style={{"marginLeft": "auto", "marginRight": "auto", "width": "fit-content"}}>
                <Link to="/">
                    <button 
                        className="button button__main button__long">
                        <div className="inner">
                        <p to="/">
                                Back to main page
                        </p>
                        </div>
                    </button>
                </Link>
            </div>



        </div>
    )
}

export default Page404;