import React from 'react';
import './App.css';
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import out from './output.json';

class Game extends React.Component {

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

    render() {
        return (
            <section className={"game"}>
                <h2>Word: {this.state.element.infinitive}</h2>
                <h4>Answers (right/all): {this.state.rightCounter}/{this.state.counter}</h4>
                <Form onSubmit={this.submit}>
                    <FormGroup>
                        <FormControl type="text" placeholder="Past Simple" ref={this.inputRef}>

                        </FormControl>
                    </FormGroup>
                </Form>
                <Button onClick={this.handlerCheckClick}>Check</Button>
                <h4 className={this.state.lastAnswerIsRight ? 'right' : 'wrong'}>{this.state.lastRightAnswer}</h4>
            </section>
        );
    }
}

export default Game;