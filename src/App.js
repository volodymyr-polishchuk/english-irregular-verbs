import React from 'react';
import './App.css';
import {Button, Container, Form, FormControl, FormGroup,} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import out from './output.json';

class App extends React.Component {

    state = {
        arr: [...out],
        element: [...out][Math.floor(Math.random() * [...out].length)],
        counter: 0,
        rightCounter: 0,
        lastRightAnswer: ''
    };

    inputRef = React.createRef();

    handlerCheckClick = () => {
        const input = this.inputRef.current;
        const value = input.value;
        if (value === this.state.element.pastSimple) {
            this.setState((state, props) => ({
                rightCounter: state.rightCounter + 1
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
            <Container>
                <h2>Word: {this.state.element.infinitive}</h2>
                <h4>Answers (right/all): {this.state.rightCounter}/{this.state.counter}</h4>
                <Form onSubmit={this.submit}>
                    <FormGroup>
                        <FormControl type="text" placeholder="Past Simple" ref={this.inputRef}>

                        </FormControl>
                    </FormGroup>
                </Form>
                <Button onClick={this.handlerCheckClick}>Check</Button>
                <h4>{this.state.lastRightAnswer}</h4>
            </Container>
        );
    }
}

export default App;
