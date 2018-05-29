import React from 'react';
import './LearnMode.css';

export default class LearnMode extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      answer: "",
      isCorrect: null,
      hasSubmittedBlank: false,
      pendingAnswerCheckEventId: null
    };

    this.updateAnswer = this.updateAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  updateAnswer(event){
    // if submitted already,
    //  wait a second, before checking answer again
    if(this.state.hasSubmittedBlank){
      const previousEventId = this.state.pendingAnswerCheckEventId;
      if (previousEventId){
        clearTimeout(previousEventId);
      }

      const eventId = setTimeout(this.checkAnswer, 1000);
      const hasSubmittedBlank = this.state.answer === "";

      this.setState({
        hasSubmittedBlank,
        pendingAnswerCheckEventId: eventId
      });
      // this.checkAnswer()
    }
    this.setState({
      answer: event.target.value
    });
  }

  checkAnswer(event){
    if (event){
      event.preventDefault();
    }

    if (this.state.answer === ""){
      this.setState({hasSubmittedBlank: true});
    }else if (this.state.answer.toLowerCase() === this.props.terms[0].definition.toLowerCase()){
      this.setState({isCorrect: true});
    } else {
      this.setState({isCorrect: false});
    }
  }

  render() {
    return (
      <div className="LearnMode">
        <h1 className="LearnMode-prompt">{this.props.terms[0].word}</h1>
        <form className="LearnMode-form" onSubmit={this.checkAnswer}>
          <input
            autoFocus={true}
            className="LearnMode-input"
            type="text"
            value={this.state.answer}
            onChange={this.updateAnswer}
          />
          <button className="LearnMode-submit" type="submit">
            Submit
          </button>
        </form>
        { this.state.hasSubmittedBlank ? <div>The answer is {this.props.terms[0].definition}. Please type it in.</div> : null }
        {
             this.state.isCorrect === true ? <div>You answered correctly!</div> :
               this.state.isCorrect === false ? <div>Sorry, wrong answer. Please try again.</div> : null
        }


      </div>
    );
  }
}
