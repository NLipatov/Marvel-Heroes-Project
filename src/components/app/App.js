import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
//Мы можем не указывать ниже файл index, потому что вебпак будет его искать в этой папке по умолчанию
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';


const App = () => {


    return (
        <Router>
            {/* <Route path="*" element={<NoMatch />} /> */}
            <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SingleComicPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main>
            </div>
        </Router>
    )
}

export default App;