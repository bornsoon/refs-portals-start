import { forwardRef, useImperativeHandle, useRef } from "react"; // ref 속성 사용 못할때 wrapping
import { createPortal } from "react-dom";
//컴포넌트의 HTML 코드를 DOM내에 다른 곳으로 옮김

// export default function ResultModal({ ref, result, targetTime, remainingTime }) {
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // 소점 두 자리수까지
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // 외부에서 호출할 수 있게 해주는 Hook
  // to expose callable function from inside this component
  // make this component more stainable and usable
  useImperativeHandle(ref, () => {
    return {
      open() {
        // 밖에서 호출되게 될 함수명
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    // React 19 버전 이상이어야 작동 (ref access OK)
    <dialog
      ref={dialog}
      className="result-modal"
      closedby="any"
      /*open*/
      onClose={onReset} // ESC키로 대화창을 다을 때 onReset이 트리거되도록 설정
    >
      {/* open 속성으로 강제로 보이게 하면 뒷배경 dimmed 처리 안됨 -> sending command */}
      {/* closedby="none || closerequest || any" */}
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal") // index.html안의 내보낼 위치
  );
  // };
});

export default ResultModal;
