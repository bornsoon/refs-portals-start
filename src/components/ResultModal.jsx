import { forwardRef } from "react"; // ref 속성 사용 못할때 wrapping

// export ResultModal = forwardRef(function ResultModal({ .... }, ref) {...})
// export default ResultModal;

export default function ResultModal({ ref, result, targetTime }) {
  return (
    // React 19 버전 이상이어야 작동 (ref access OK)
    <dialog ref={ref} className="result-modal" closedby="any" /*open*/>
      {/* open 속성으로 강제로 보이게 하면 뒷배경 dimmed 처리 안됨 -> sending command */}
      {/* closedby="none || closerequest || any" */}
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
