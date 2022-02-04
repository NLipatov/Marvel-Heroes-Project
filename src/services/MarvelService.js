class MarvelService {

    //https://developer.marvel.com/docs#!/public/getCharacterIndividual_get_1
    _apiBase =  'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=57154446fbcdf91835c754d178644ecb';

    getResourse = async (url) => {
       let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

       return res.json();
    } 

    getAllCharacters = async() => {
       const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
       return res.data.results.map(this._transformCharacter);
    }
   
    getCharacter = async(id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let OF = '';
        if(`${char.thumbnail.path}.${char.thumbnail.extension}`  === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            OF = 'contain';
        }
        else{
            OF = 'cover';
        }


        return {
            name: char.name,
            description: (char.description.length !== 0) ? char.description : "There is no description for this character",
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            objectFit: OF,
            comics: char.comics.items
        }
    }

}

export default MarvelService;