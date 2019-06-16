import * as React from "react";

export default class Statistic extends React.Component {

    state = {
        showContent: false,
        statistics: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            showContent: props.showContent || false,
            statistics: props.statistics,
        };
    }

    openStatistic = () => {
        this.setState({
            showContent: true
        })
    };

    closeStatistic = () => {
        debugger;
        this.setState({
            showContent: false
        });
    };

    content = (
        <div onClick={this.closeStatistic}>
            Close statistics ▲
            <section>
                {JSON.stringify(this.state.statistics)}
            </section>
        </div>
    );

    label = (
        <div onClick={this.openStatistic}>
            Open statistics ▼
        </div>
    );

    render() {
        return (
            <main>
                {this.state.showContent ? this.content : this.label}
            </main>
        )
    }
}
