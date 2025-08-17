import { useState, useRef } from "react";

import ResultModal from "./ResultModal.jsx";

// let timer; 리렌더링 되어더 변경되지는 않지만 새로운 타이머가 덮어씌어짐

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(); // 각각의 컴포넌트에 각자의 타이머가 저장됨
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // 상태 업데이트를 컴포넌트 안에서 할 때 주의!
    // if 조건문 안에 없으면 리렌더링 무한반복 일어나게 됨!
    // setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  // let timer; State 변경되면 새로운 값으로 바뀌어버림!!!

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    // timer.current = setTimeout(() => {
    // setInterval 함수는 시간이 만료될 때마다 실행됨 (한 번만이 아님)
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // dialog.current.showModal();
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
      // dialog.current.open(); // useImperativeHandle에서 정의된 함수명
    }, 10);
    // setTimerStarted(true);
  }

  function handleStop() {
    // clearTimeout(timer.current);
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result="lost"
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="chanllenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
