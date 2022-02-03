import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react/cjs/react.production.min';



class CharList extends Component {
    constructor(props){
        super(props);
    }

    state = {
        characters: [],
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.marvelService.getAllCharacters()
        .then(this.updateCharacterList)
    }

    updateCharacterList = (characters) => {
        this.setState({characters});
    }

    render(){
        const {characters} = this.state;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {
                        characters.map((character)=>(
                            <li className="char__item">
                                <img src={character.thumbnail} alt="abyss"/>
                                <div className="char__name">{character.name}</div>
                            </li>  
                        ))
                    }
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;