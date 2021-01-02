import React, { Component } from 'react'
import { QuizData } from './QuizData';

export class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAnswer: null, //current users answer
      currentIndex: 0,  //current questions index
      options: [],     //the four options
      quizEnd: false,  //determines if it's the last question
      score: 0,        //holds the score
      disabled: true   // determines the status of the buttons
    }
  }

  loadQuiz = () => {
    const { currentIndex } = this.state //get the current question index
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer
      }
    })
  }

  nextQuestionHander = () => {
    const { userAnswer, answer, score } = this.state
    this.setState({
      currentIndex: this.state.currentIndex + 1
    })
    if (userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }
  }

  componentDidMount() {
    this.loadQuiz()
  }

  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer
        }
      });
    }
  }

  finishHandler = () => {
    const { userAnswer, answer, score } = this.state
    if (userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true
      })
    }
  }

  render() {
    const {
      question, options, currentIndex, userAnswer, quizEnd } = this.state //get the current state


    if (quizEnd) {
      return (
        <div className='app'>
          <div className='question-section'>
            <div className='question-count'>
              <span>Your score is {this.state.score} points.</span>
            </div>
            <div className='question-text'>The correct answers for the quiz are:</div>
          </div>

          <div className='answer-section'>
            <ol>
              {QuizData.map((item, index) => (
                <li className='ui floating message options'
                  key={index}>
                  {item.answer}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )
    }

    return (
      <div className='app'>
        <div className='question-section'>
          <div className='question-count'>
            <span>Question {currentIndex + 1}</span>/{QuizData.length}
          </div>
          <div className='question-text'>{question}</div>
        </div>

        <div className='answer-section'>
          {options.map(option => (
            <p key={option.id}
              className={`ui floating message options
                ${userAnswer === option ? "selected" : null}
                `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
        </div>

        <div className='button-div'>
          {currentIndex < QuizData.length - 1 &&
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHander}
            >Next</button>
          }
          {currentIndex === QuizData.length - 1 &&
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.finishHandler}
            >Finish</button>
          }
        </div>
      </div>
    )
  }
}

export default Quiz