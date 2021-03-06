import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/spinner';

const Page404 = lazy(()=> import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const CharacterPage = lazy(() => import("../pages/CharacterPage"))

// 661 KB

const App = () => {
    return (
        <Router>
            <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/comics/*" element={<ComicsPage/>}/>
                                <Route path="/character/*" element={<CharacterPage/>}/>
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        </Suspense>
                    </main>
            </div>
        </Router>
    )
}

export default App;