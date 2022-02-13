import AppBanner from "../appBanner/AppBanner";
import {Route, Routes} from 'react-router-dom';
import SingleChar from '../singleChar/SingleChar';



const CharacterPage = () => {
    return(
        <>
            <AppBanner/>
            <Routes>
                <Route path="/:id" element={<SingleChar/>}/>
            </Routes>
        </>
    )
}

export default CharacterPage;