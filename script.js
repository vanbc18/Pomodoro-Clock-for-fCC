//Pomodoro Clock using React and Bootstrap

const App = () => {
  const defaultStartTime = 25 * 60; //25 minutes in seconds
  const defaultBreakLength = 5 * 60; // 5 min in seconds

  const [session, setSession] = React.useState("Session"); //gets the name of the session
  const [breakLength, setBreakLength] = React.useState(defaultBreakLength); //sets the length of the break
  const [sessionLength, setSessionLength] = React.useState(defaultStartTime); //sets the length of the work session
  const [timeLeft, setTimeLeft] = React.useState(defaultStartTime); //this is our timer display
  const [isActive, setIsActive] = React.useState(false); //I'll use this in my toggle function

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));

  }; //this formats our time in seconds to minutes & seconds

  const toggle = () => {
    setIsActive(!isActive);
  }; //this one is to toggle between session & break timers

  const playSound = () => {
    const getSound = document.getElementById("beep");
    getSound.play();
  }; //plays a sound

  const reset = () => {
    setBreakLength(defaultBreakLength);
    setSessionLength(defaultStartTime);
    setTimeLeft(defaultStartTime);
    setIsActive(false);
    setSession("Session");
    const sound = document.getElementById("beep");
    const stop = sound.pause();
    sound.currentTime = 0;
  };

  React.useEffect(() => {
    let sessionTimer = null;
    let breakTimer = null;
    if (isActive) {
      sessionTimer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        };
      }, 1000);
    } else if (!isActive && formatTime(timeLeft) !== "00:00" || reset) {
      clearInterval(sessionTimer);
    };

    if (isActive && formatTime(timeLeft) === "00:00") {
      playSound();
      if (session === "Session") {
        setSession("Break");
        setTimeLeft(breakLength);
      } else if (session === "Break") {
        setSession("Session");
        setTimeLeft(sessionLength);
      };

      if (isActive) {
        breakTimer = setInterval(() => {
          if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
          }}, 1000);
      } else if (!isActive && formatTime(timeLeft) !== "00:00" || reset) {
        clearInterval(breakTimer);
      };
    };

    return () => clearInterval(sessionTimer);
  }, [isActive, timeLeft]);


  const breakInc = () => {
    if (breakLength < 60 * 60) {
      setBreakLength(breakLength + 60);
    }
  };

  const breakDec = () => {
    if (breakLength > 60) {
      setBreakLength(breakLength - 60);
    }
  };

  const sessionInc = () => {
    if (sessionLength < 60 * 60) {
      setSessionLength(sessionLength + 60);
      setTimeLeft(sessionLength + 60);
    }
  };

  const sessionDec = () => {
    if (sessionLength > 60) {
      setSessionLength(sessionLength - 60);
      setTimeLeft(sessionLength - 60);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { id: "pomodoro-box", className: "container text-center" }, /*#__PURE__*/
    React.createElement("h1", { id: "title" }, "fCC Pomodoro Clock"), /*#__PURE__*/
    React.createElement("div", { id: "time-left" }, formatTime(timeLeft)), /*#__PURE__*/
    React.createElement("h3", { id: "timer-label" }, session), /*#__PURE__*/
    React.createElement("div", { className: "row" }, /*#__PURE__*/
    React.createElement("button", { id: "start_stop", className: "btn btn-primary", onClick: toggle }, " ", isActive ? 'Stop' : 'Start', " "), /*#__PURE__*/
    React.createElement("button", { id: "reset", className: "btn btn-danger", onClick: reset }, " Reset ")), /*#__PURE__*/

    React.createElement("br", null), /*#__PURE__*/
    React.createElement("div", { className: "row" }, /*#__PURE__*/
    React.createElement("div", { id: "break-label" }, /*#__PURE__*/
    React.createElement("div", { className: "col-xs-6" }, /*#__PURE__*/
    React.createElement("div", { id: "left-well", className: "well" }, /*#__PURE__*/
    React.createElement("h4", null, "Break Length"), /*#__PURE__*/
    React.createElement("button", { id: "break-increment", className: "btn btn-success", onClick: breakInc }, "+"), /*#__PURE__*/
    React.createElement("div", { id: "break-length" }, breakLength / 60), /*#__PURE__*/
    React.createElement("button", { id: "break-decrement", className: "btn btn-warning", onClick: breakDec }, "-")))), /*#__PURE__*/



    React.createElement("div", { id: "session-label" }, /*#__PURE__*/
    React.createElement("div", { className: "col-xs-6" }, /*#__PURE__*/
    React.createElement("div", { id: "left-well", className: "well" }, /*#__PURE__*/
    React.createElement("h4", null, "Session Length"), /*#__PURE__*/
    React.createElement("button", { id: "session-increment", className: "btn btn-success", onClick: sessionInc }, "+"), /*#__PURE__*/
    React.createElement("div", { id: "session-length" }, sessionLength / 60), /*#__PURE__*/
    React.createElement("button", { id: "session-decrement", className: "btn btn-warning", onClick: sessionDec }, "-"))))), /*#__PURE__*/




    React.createElement("br", null), /*#__PURE__*/
    React.createElement("audio", { id: "beep", preload: "auto", src: "https://www.soundjay.com/buttons/sounds/button-2.mp3" }), /*#__PURE__*/
    React.createElement("footer", { id: "footer" }, "\xA9 2022 Van B-C.")));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("App"));