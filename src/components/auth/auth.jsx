import React, { Component } from 'react';
import gsap from 'gsap';
import Login from './login';

export class auth extends Component {
    render() {
        return (
            <div className='auth'>
                
                <div className="auth__frame">
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                    <div className="auth__frame-div"></div>
                </div>
                <div className="auth__cover">
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                    <div className="auth__cover-div"></div>
                </div>
            </div>
        )
    }
}

export default auth
