import React, { Component } from 'react';
import JSONEditorDemo from './JSONEditorDemo'
class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            reponse: '',
            method: '',
            request: '',
            responseHeaders: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.choisirPostOuGet = this.choisirPostOuGet.bind(this);
    }

    handleChange(event) {
        this.setState({ url: event.target.value });
    }

    choisirPostOuGet(event) {
        this.setState({ method: event.target.value });
    }

    handleSubmit(event) {
        var toto = this
        console.log(this.state.url);
        console.log(this.state.method);
        this.callUrl(toto, this.state.url, this.state.method);
        console.log(this.state.reponse)
        event.preventDefault();
    }

    callUrl(toto, url, methode) {
        const axios = require('axios').default;
        axios.interceptors.request.use(function (config) {
            console.log(config)
            toto.setState({ request: config })
            return config
        })
        axios.interceptors.response.use(function (response) {
            toto.setState({
                reponse: response,
                responseHeaders: response.headers

            })
            return response;
        })
        axios({
            method: methode,
            url: url,
            headers: { 'Access-Control-Allow-Origin': 'http://insee.fr' }
        }).then(function (response) {
            console.log(response);
            return response;
        }).catch(function (error) {
            console.log(error)
        }).finally(function () {

        });
    }

    render() {
        return (
            <div>
                <center>
                    <form onSubmit={this.handleSubmit}>
                        <label> Url appelé :
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <label>Type requête :
                    <select onChange={this.choisirPostOuGet}>
                                <option value="get">GET</option>
                                <option value="post">POST</option>
                            </select>
                        </label>
                        <input type="submit" value="Envoyer" />
                    </form>
                    <br />
                    <div>
                        <table style={{ border: 'none' }}>
                            <col width="200" />
                            <col width="1200" />
                            <tr>
                                <td>Requete :</td>
                                <td><JSONEditorDemo
                                    json={this.state.request}
                                    onChangeJSON={this.onChangeJSON}
                                /></td>
                            </tr>
                            <tr>
                                <td>Reponse headers :</td>
                                <td><JSONEditorDemo
                                    json={this.state.responseHeaders}
                                    onChangeJSON={this.onChangeJSON}
                                /></td>
                            </tr>
                            <tr>
                                <td>Reponse:</td>
                                <td><JSONEditorDemo
                                    json={this.state.reponse}
                                    onChangeJSON={this.onChangeJSON}
                                /></td>
                            </tr>
                        </table>
                    </div>
                </center>
            </div >
        );
    }
}

export default Root;
