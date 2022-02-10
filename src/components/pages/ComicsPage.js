import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComicPage from "./SingleComicPage";
import {Route, Routes} from 'react-router-dom';


const ComicsPage = () => {
    return(
        <>
            <AppBanner/>
            <Routes>
                <Route path="/" element={<ComicsList/>}/>
                <Route path=":id" element={<SingleComicPage/>}/>
            </Routes>
        </>
    )
}

export default ComicsPage;