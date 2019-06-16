import React from 'react';
import './App.css';
import {Button, Container, Form, FormControl, FormGroup,} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import out from './output.json';

class App extends React.Component {

    state = {
        arr: App.getWords(),
        element: [...out][Math.floor(Math.random() * [...out].length)],
        counter: 0,
        rightCounter: 0,
        lastRightAnswer: '',
        lastAnswerIsRight: false
    };

    static getWords() {
        return [...out].map(value => ({ ...value, counter: 0 }));
    }

    inputRef = React.createRef();

    handlerCheckClick = () => {
        const input = this.inputRef.current;
        const value = input.value;
        if (value.toUpperCase().trim() === this.state.element.pastSimple.toUpperCase()) {
            this.rightAnswer();
        } else {
            this.wrongAsnwer();
        }
        let newElement = this.getNewElement();
        this.setState((state, props) => ({
            counter: state.counter + 1,
            lastRightAnswer: state.element.pastSimple,
            element: newElement,
        }));
        input.value = '';
    };

    wrongAsnwer() {
        this.setState((state, props) => ({
            lastAnswerIsRight: false
        }));
    }

    rightAnswer() {
        this.setState((state, props) => ({
            rightCounter: state.rightCounter + 1,
            lastAnswerIsRight: true,
        }));
    }

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
                <section className="header">
                    <div className="header-answers">
                        <h2>W: {this.state.element.infinitive}</h2>
                        <small>
                            Last&nbsp;right:&nbsp;
                            <span className={'last-right-answer ' + (this.state.lastAnswerIsRight ? 'right' : 'wrong')}>
                                {this.state.lastRightAnswer}
                            </span>
                        </small>
                    </div>
                    <small className="score">
                        <span className="score-value">
                            {this.state.rightCounter}/{this.state.counter}
                        </span>
                        <div className="score-title">
                            score
                        </div>
                    </small>
                </section>
                <Form onSubmit={this.submit}>
                    <FormGroup className="main-form">
                        <FormControl type="text" placeholder="Past Simple" ref={this.inputRef}>

                        </FormControl>
                        <Button onClick={this.handlerCheckClick}>Check</Button>
                    </FormGroup>
                </Form>
                {/*<Statistic showContent={true} statistics={this.state.arr}/>*/}
            </Container>
        );
    }
}

export default App;
