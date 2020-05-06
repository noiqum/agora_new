import React, { Component } from 'react';
import axios from 'axios';

export class search extends Component {

    state={
        query:'',
        results:null,
        selected:null
    }

    tomtom_api_key='YMbHpGvNdNyXxSM65qGi5GVRk2TQ68GQ';

    handleChange=(e)=>{
        this.setState({query:e.target.value});
        if(this.state.query.length >= 3){
            axios.get(`https://api.tomtom.com/search/2/autocomplete/${this.state.query}.json?key=${this.tomtom_api_key}&language=en-US`)
            .then(res=>{
                console.log(res.data.context)
            })
        }
    }
    render() {
        return (
            <div>   
                <input type="text" onChange={this.handleChange} />
                <div>
                {
                    this.state.results === null ? <p>loading</p> : (this.state.results.map(el=>{
                        return el
                    }))

                }  
                 </div>
            </div>
        )
    }
}

export default search
