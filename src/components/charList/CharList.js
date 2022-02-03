import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react/cjs/react.production.min';



class CharList extends Component {

    state = {
        characters: [],
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.marvelService.getAllCharacters()
        .then(this.updateCharacterList)
    }

    updateCharacterList = (characters) => {
        this.setState({characters, loading: false});
    }

    render(){
        const {characters} = this.state;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {
                        characters.map((character)=>(
                            
                            <li className="char__item" key={character.id}
                            onClick={()=> this.props.onCharSelected(character.id)}>
                                <img src={character.thumbnail} alt={character.name} style={{objectFit: `${character.objectFit}`}}/>
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