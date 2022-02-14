import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComicPage from "./SingleComicPage";
import {Route, Routes} from 'react-router-dom';
import {Helmet} from 'react-helmet';


const ComicsPage = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of comics"
                    />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner/>
            <Routes>
                <Route path="/" element={<ComicsList/>}/>
                <Route path=":id" element={<SingleComicPage/>}/>
            </Routes>
        </>
    )
}

export default ComicsPage;