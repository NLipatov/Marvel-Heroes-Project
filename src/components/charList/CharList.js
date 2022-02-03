import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react/cjs/react.production.min';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';



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
        const {characters, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View characters={characters} onCharSelected={this.props.onCharSelected}/> : null;



        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({characters, onCharSelected}) =>{
    return(
        <>
            <ul className="char__grid">
                {
                    characters.map((character)=>(
                        <li className="char__item" key={character.id}
                            onClick={()=> onCharSelected(character.id)}>
                            <img src={character.thumbnail} alt={character.name} style={{objectFit: `${character.objectFit}`}}/>
                            <div className="char__name">{character.name}</div>
                        </li>  
                    ))
                }
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </>
    )
}

export default CharList;