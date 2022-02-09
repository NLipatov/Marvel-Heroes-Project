import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
//Мы можем не указывать ниже файл index, потому что вебпак будет его искать в этой папке по умолчанию
import {MainPage, ComicsPage} from '../pages';


const App = () => {


    return (
        <Router>
            <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                        </Routes>
                    </main>
            </div>
        </Router>
    )
}

export default App;