import { useState } from "react";
import styled from "styled-components";
import { Button } from "./styles/Button.styled";
import { TimerButton } from "./styles/TimerButton.styled";
import { LogsButton } from "./styles/LogsButton.styled";

const Container = styled.div`
  width: 390px;
  height: 100vh;
  margin: 0 auto;
  padding-top: 70px;
  padding-bottom: 30px;
  background: #000300;
  text-align: center;
  font-family: Raleway, sans-serif;
  color: #fef2e7;
  p,
  h1 {
    margin: 0;
  }
  .title {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 1px;
  }
  .subtitle {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  .timer-wrapper {
    margin: 40px 0;
    padding: 160px 0;
    background-image: url(src/images/Rings.png);
    background-position: center;
    background-size: cover;
    .timer {
      font-family: Helvetica;
      font-size: 60px;
      font-weight: 300;
      line-height: 60px;
      letter-spacing: 0.1em;
      margin-bottom: 30px;
    }
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 45px;
  }
  .logs-wrapper {
    &:before {
      content: "";
      display: block;
      margin: 0 auto;
      width: 40px;
      height: 0.5px;
      background-color: #fef2e7;
    }
  }
`;

function App() {
  const [focusValue, setFocusValue] = useState(25);
  const breakValue = 5;

  return (
    <Container>
      <p className="subtitle">- GET THE WORK DONE -</p>
      <h1 className="title">POMODORO FOCUS</h1>
      <div className="timer-wrapper">
        <p className="timer">{focusValue}:00</p>
        <TimerButton
          className="subtract-minutes"
          onClick={() => {
            if (focusValue > 5) {
              setFocusValue(focusValue - breakValue);
            }
          }}
        >
          -
        </TimerButton>
        <TimerButton
          className="subtract-add-minutes"
          onClick={() => {
            if (focusValue < 60) {
              setFocusValue(focusValue + breakValue);
            }
          }}
        >
          +
        </TimerButton>
      </div>
      <div className="button-wrapper">
        <Button className="start">START FOCUS</Button>
        <Button className="break">TAKE A BREAK</Button>
      </div>
      <div className="logs-wrapper">
        <LogsButton className="logs-button">Show logs</LogsButton>
      </div>
    </Container>
  );
}

export default App;
