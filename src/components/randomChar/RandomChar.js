import { Component } from 'react/cjs/react.production.min';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';


class RandomChar extends Component {
    constructor(props){
        super(props);
        this.updateChar();

    }

    state = {
        char: {}, 
        loading: true,
        objectFit: '',
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        if(char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            char.objectFit = 'contain';
        }
        else{
            char.objectFit = 'cover';
        }
        
        this.setState({char, loading: false});
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.setState({loading: true})
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded, this.updateChar)
    }

    render(){
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                {loading ? <Spinner/> : <View char={char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                        onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr" style={{height: "fit-content"}}>
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )

}

export default RandomChar;