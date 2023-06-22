import { useState, useEffect, useRef } from "react";
import { Container } from "./styles/Container.styled";
import { ActionButton } from "./styles/ActionButton.styled";
import { ChangeFocusTimeButton } from "./styles/ChangeFocusTimeButton.styled";
import { LogsButton } from "./styles/LogsButton.styled";

function App() {
  const focusMinutesValue = 25;
  const focusSecondsValue = "00";
  const breakMinutesValue = 5;
  const breakSecondsValue = "00";
  const changeTimerValue = 5;
  const [currentMinutes, setCurrentMinutes] = useState(focusMinutesValue);
  const [currentSeconds, setCurrentSeconds] = useState(focusSecondsValue);
  const time = useRef(currentMinutes * 60 + parseInt(currentSeconds));
  const [startScreen, setStartScreen] = useState(true);
  const [breakMode, setBreakMode] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let interval = null;
    if (!isPaused && isStarted) {
      interval = setInterval(updateCountdown, 1000);
    }

    if (isCanceled) {
      clearInterval(interval);
      makeTimerReadyToStart();
    }

    function updateCountdown() {
      const minutes = Math.floor(time.current / 60);
      let seconds = time.current % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setCurrentMinutes(minutes);
      setCurrentSeconds(seconds);
      time.current--;

      if (time.current < 0) {
        clearInterval(interval);
        setIsDone(true);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [isStarted, isPaused, breakMode, isCanceled]);

  function makeTimerReadyToStart() {
    setIsStarted(false);
    setIsPaused(false);
    if (breakMode) {
      setCurrentMinutes(breakMinutesValue);
      setCurrentSeconds(breakSecondsValue);
    } else {
      setCurrentMinutes(focusMinutesValue);
      setCurrentSeconds(focusSecondsValue);
    }
  }

  function updateTitle() {
    if (startScreen) {
      return "POMODORO FOCUS";
    } else if (breakMode) {
      return "BREAK";
    } else {
      return "FOCUS";
    }
  }

  return (
    <Container>
      <p className="subtitle">
        -{breakMode ? "RECHARGING" : "GET THE WORK DONE"}-
      </p>
      <h1 className="title">{updateTitle()}</h1>
      <div className="timer-wrapper">
        <p className="timer">
          {currentMinutes}:{currentSeconds}
        </p>
        {/* Button to subtract minutes */}
        <ChangeFocusTimeButton
          onClick={() => {
            if (currentMinutes > 5) {
              setCurrentMinutes(currentMinutes - changeTimerValue);
            }
          }}
        >
          -
        </ChangeFocusTimeButton>
        {/* Button to add minutes */}
        <ChangeFocusTimeButton
          onClick={() => {
            if (currentMinutes < 60) {
              setCurrentMinutes(currentMinutes + changeTimerValue);
            }
          }}
        >
          +
        </ChangeFocusTimeButton>
      </div>
      <div className="button-wrapper">
        {/* Button to start countdown focus mode */}
        {!isStarted && !isPaused && !breakMode && (
          <ActionButton
            onClick={() => {
              setIsStarted(true);
              setIsPaused(false);
              setIsCanceled(false);
              setStartScreen(false);
              time.current = currentMinutes * 60 + parseInt(currentSeconds);
            }}
          >
            START FOCUS
          </ActionButton>
        )}
        {/* Button to pause countdown */}
        {isStarted && !isDone && (
          <ActionButton
            onClick={() => {
              setIsPaused(true);
              setIsStarted(false);
              time.current = currentMinutes * 60 + parseInt(currentSeconds);
            }}
          >
            PAUSE
          </ActionButton>
        )}
        {/* Button to continue countdown */}
        {isPaused && !isDone && (
          <ActionButton
            onClick={() => {
              setIsPaused(false);
              setIsStarted(true);
              time.current = currentMinutes * 60 + parseInt(currentSeconds);
            }}
          >
            RESUME
          </ActionButton>
        )}
        {/* Button to cancel timer */}
        {(isStarted || isPaused) && !isDone && (
          <ActionButton onClick={() => setIsCanceled(true)}>
            CANCEL
          </ActionButton>
        )}
        {/* Button to go to break mode */}
        {!isStarted && !isPaused && !breakMode && (
          <ActionButton
            onClick={() => {
              setBreakMode(true);
              setStartScreen(false);
              setCurrentMinutes(breakMinutesValue);
              setCurrentSeconds(breakSecondsValue);
            }}
          >
            TAKE A BREAK
          </ActionButton>
        )}
        {/* Button to start countdown break mode */}
        {breakMode && !isStarted && !isPaused && (
          <ActionButton
            onClick={() => {
              setIsStarted(true);
              setIsPaused(false);
              setIsCanceled(false);
              time.current = currentMinutes * 60 + parseInt(currentSeconds);
            }}
          >
            START BREAK
          </ActionButton>
        )}
        {/* Button to go to focus mode */}
        {breakMode && !isStarted && !isPaused && (
          <ActionButton
            onClick={() => {
              setCurrentMinutes(focusMinutesValue);
              setBreakMode(false);
              setStartScreen(true);
            }}
          >
            FOCUS
          </ActionButton>
        )}
        {/* Button to start focus or break countdown immediately after the break or focus cycle is ended*/}
        {isDone && (
          <ActionButton
            onClick={() => {
              if (breakMode) {
                setCurrentMinutes(focusMinutesValue);
                setCurrentSeconds(focusSecondsValue);
              } else {
                setCurrentMinutes(breakMinutesValue);
                setCurrentSeconds(breakSecondsValue);
              }
              setIsStarted(true);
              setIsPaused(false);
              setIsDone(false);
              time.current = currentMinutes * 60 + parseInt(currentSeconds);
            }}
          >
            {breakMode
              ? `FOCUS NOW ${focusMinutesValue}:${focusSecondsValue}`
              : `BREAK ${breakMinutesValue}:${breakSecondsValue}`}
          </ActionButton>
        )}
        {/* Button to go to start screen */}
        {isDone && (
          <ActionButton
            onClick={() => {
              setIsDone(false);
              setStartScreen(true);
              makeTimerReadyToStart();
            }}
          >
            DONE
          </ActionButton>
        )}
      </div>
      <div className="logs-wrapper">
        <LogsButton className="logs-button">Show logs</LogsButton>
      </div>
    </Container>
  );
}

export default App;
