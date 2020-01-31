import React, { Component } from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import './JSONEditorDemo.css';

export default class JSONEditorDemo extends Component {
    componentDidMount() {
        const options = {
            mode: 'text',
            onChangeJSON: this.props.onChangeJSON
        };
        console.log(this.props.json)
        this.jsoneditor = new JSONEditor(this.container, options);
        this.jsoneditor.set(this.props.json);
    }

    componentWillUnmount() {
        if (this.jsoneditor) {
            this.jsoneditor.destroy();
        }
    }

    componentDidUpdate() {
        this.jsoneditor.update(this.props.json);
    }

    render() {
        return (
            <div className="jsoneditor-react-container" ref={elem => this.container = elem} />
        );
    }
}