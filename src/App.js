import React from 'react';
import './App.css';
import Game from './Game'

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/*TODO Add animation in this tag*/}
                <div className={'animation_block'}>
                    <p className={'animation_number'}>1</p>
                    <p className={'animation_number'}>0</p>
                    <p className={'animation_number'}>0</p>
                    <p className={'animation_number'}>1</p>
                    <p className={'animation_number'}>1</p>
                    <p className={'animation_number'}>1</p>
                    <p className={'animation_number'}>0</p>
                    <p className={'animation_number'}>1</p>
                    <p className={'animation_number'}>0</p>
                    <p className={'animation_number'}>1</p>
                    <p className={'animation_number'}>0</p>
                    <p className={'animation_number'}>0</p>
                    <p className={'animation_number'}>1</p>
                    <p className={'animation_number'}>0</p>
                    <p className={'animation_number'}>0</p>
                </div>
                <main>
                    <header>
                        <h1>Be Like <span className={'robot'}>Robot</span></h1>
                    </header>
                    <Game/>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
