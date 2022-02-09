import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
//Мы можем не указывать ниже файл index, потому что вебпак будет его искать в этой папке по умолчанию
import {MainPage, ComicsPage} from '../pages';


const App = () => {


    return (
        <Router>
            <div className="app">
                    <AppHeader/>
                    <main>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage/>
                            </Route>
                        </Switch>
                    </main>
            </div>
        </Router>
    )
}

export default App;