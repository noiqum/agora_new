import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


export class autoComplete extends Component {

    state={
        address:'',
        scriptLoaded:false
    }

    handleChange=(address)=>{
        this.setState({address})
    }
    handleSelect=(address)=>{
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    }
    handleScriptload=()=>{
        this.setState({scriptLoaded:true})
    }

    


    render() {
        return (<div className='auto-complete'>
            

            <PlacesAutocomplete
            value={this.state.address} 
            onSelect={this.handleSelect}
            onChange={this.handleChange}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading })=>(
                    <div className='auto-complete__container' >
                        <input {...getInputProps({className:'auto-complete__input'})}></input>
                        <div className="auto-complete__dropdown"></div>
                             {loading && <div>Loading...</div>}
                             {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                 ? 'suggestion-item--active'
                                 : 'suggestion-item';
                                 return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                         className})}>
                                <span>{suggestion.description}</span> 
                                </div>
                             );
                        })}
                    
                    </div>
                )}
            </PlacesAutocomplete>
            </div>
        )

    }
}

export default autoComplete
