import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Game from './Game'

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/*TODO Add animation in this tag*/}
                <div className="background-animation"></div>
                <main>
                    <header>
                        <h1>Be Like robot</h1>
                    </header>
                    <Game/>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
