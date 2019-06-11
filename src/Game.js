import React from 'react';
import './App.css';
import out from './output.json';
import './Game.css';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef()   // Create a ref object
    }

    state = {
        arr: [...out],
        element: [...out][Math.floor(Math.random() * [...out].length)],
        counter: 0,
        rightCounter: 0,
        lastRightAnswer: '',
        lastAnswerIsRight: false
    };

    inputRef = React.createRef();

    handlerCheckClick = () => {
        const input = this.inputRef.current;
        const value = input.value;
        if (value.toUpperCase() === this.state.element.pastSimple.toUpperCase()) {
            this.setState((state, props) => ({
                rightCounter: state.rightCounter + 1,
                lastAnswerIsRight: true
            }));
        } else {
            this.setState((state, props) => ({
                lastAnswerIsRight: false
            }));
        }
        let newElement = this.getNewElement();
        this.setState((state, props) => ({
            counter: state.counter + 1,
            lastRightAnswer: state.element.pastSimple,
            element: newElement,
        }));
        this.scrollToMyRef();
        input.value = '';
    };

    getNewElement = () => {
        const number = Math.floor(Math.random() * this.state.arr.length);
        return this.state.arr[number];
    };

    submit = (e) => {
        e.preventDefault();
        this.handlerCheckClick();
    };

    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

    render() {
        return (
            <section className={"game"}>
                <h2>Word: {this.state.element.infinitive}</h2>
                <h4>Answers (right/all): {this.state.rightCounter}/{this.state.counter}</h4>
                <form onSubmit={this.submit}>
                    <input type="text" placeholder="Past Simple" ref={this.inputRef}>

                    </input>
                </form>
                <button onClick={this.handlerCheckClick}>Check</button>
                <h4 ref={this.myRef} className={`answer ${this.state.lastAnswerIsRight ? 'right' : 'wrong'}`}>{this.state.lastRightAnswer || '_'}</h4>
            </section>
        );
    }
}

export default Game;