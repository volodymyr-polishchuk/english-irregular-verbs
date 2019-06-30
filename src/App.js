import React from 'react';
import './App.css';
import {Button, Container, Form, FormControl, FormGroup,} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import out from './data/output.json';

class App extends React.Component {

    state = {
        arr: App.getWords(),
        element: App.getWords()[Math.floor(Math.random() * App.getWords().length)],
        counter: 0,
        rightCounter: 0,
        lastRightAnswer: '',
        lastAnswerIsRight: false,
        wrongElements: [],
        currentValue: null,
        terms: {
            name: 'Past Simple',
            key: 'pastSimple',
        }
    };
    handleType = (event) => {
        this.setState({
            currentValue: event.target.value,
        });
    };
    changeToPastSimple = (event) => {
        this.setState({
            terms: {
                name: 'Past Simple',
                key: 'pastSimple',
            }
        })
    };
    changeToPastParticiple = (event) => {
        this.setState({
            terms: {
                name: 'Past Participle',
                key: 'pastParticiple',
            }
        })
    };

    static getWords() {
        return [...out].map(value => ({ ...value, counter: 0 }));
    }

    inputRef = React.createRef();

    handlerCheckClick = () => {
        const input = this.inputRef.current;
        const value = input.value;
        if (this.isRight(value)) {
            this.rightAnswer();
        } else {
            this.wrongAnswer(value);
        }
        let newElement = this.getNewElement();
        this.setState((state, props) => ({
            counter: state.counter + 1,
            lastRightAnswer: state.element[state.terms.key],
            element: newElement,
        }));
        input.value = '';
    };

    isRight(value) {
        let cleanAnswer = value.toUpperCase().trim();
        cleanAnswer = cleanAnswer.replace(/(\/| {3}| {2}| |\||\\|, )/g, '/');
        const revert = cleanAnswer.split('/').reverse().join('/');
        let formattedAswer = this.state.element[this.state.terms.key].toUpperCase();
        return cleanAnswer === formattedAswer || revert === formattedAswer;
    }

    wrongAnswer(value) {
        this.setState((state, props) => ({
            lastAnswerIsRight: false,
            wrongElements: [value, ...state.wrongElements]
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
                    <div className="header-answers my-card">
                        <h2 data-toggle="tooltip" data-placement="top" title="Tooltip on top">{this.state.element.infinitive}</h2>
                        <small>{this.state.element.translate}</small>
                        <small>
                            Last&nbsp;right:&nbsp;
                            <span className={'last-right-answer ' + (this.state.lastAnswerIsRight ? 'right' : 'wrong')}>
                                {this.state.lastRightAnswer}
                            </span>
                        </small>
                    </div>
                    <small className="score my-card">
                        <span className="score-value">
                            {this.state.rightCounter}/{this.state.counter}
                        </span>
                        <span>
                            {this.getScoreInPercent()}
                        </span>
                        <div className="score-title">
                            score
                        </div>
                    </small>
                </section>
                <Form onSubmit={this.submit}>
                    <FormGroup className="main-form">
                        <FormControl type="text" placeholder={this.state.terms.name} ref={this.inputRef} onKeyUp={this.handleType}>

                        </FormControl>
                        <Button onClick={this.handlerCheckClick}>Check</Button>
                    </FormGroup>
                </Form>
                <div className="my-card wrong-answers">
                    {
                        this.state.wrongElements
                            .filter((value, index, array) => array.indexOf(value) === index)
                            .filter(value => value.includes(this.state.currentValue))
                            .map(value => (
                                    <div key={value}>{value}</div>
                                )
                            )
                    }
                </div>
                <div className="my-card select-for-terms">
                    <Button onClick={this.changeToPastSimple}>Past Simple</Button>
                    <Button onClick={this.changeToPastParticiple}>Past Participle</Button>
                </div>
                {/*<Statistic showContent={true} statistics={this.state.arr}/>*/}
            </Container>
        );
    }

    getScoreInPercent() {
        if (isNaN(this.state.rightCounter / this.state.counter)) {
            return '--%';
        } else {
            return Math.round(this.state.rightCounter / this.state.counter * 100) + '%';
        }
    }
}

export default App;
