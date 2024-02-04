'use client';

/* Core */
import { useState } from 'react';

/* Instruments */
import {
  counterSlice,
  useSelector,
  useDispatch,
  selectCount,
  incrementAsync,
  incrementIfOddAsync,
} from '@/store/redux';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState(2);
  return (
    <div className="card">
      <p>redux demo</p>
      <div>
        <button aria-label="Decrement value" onClick={() => dispatch(counterSlice.actions.decrement())}>
          -
        </button>
        <span>{count}</span>
        <button aria-label="Increment value" onClick={() => dispatch(counterSlice.actions.increment())}>
          +
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value ?? 0))}
        />
        <button onClick={() => dispatch(counterSlice.actions.incrementByAmount(incrementAmount))}>Add Amount</button>
        <button onClick={() => dispatch(incrementAsync(incrementAmount))}>Add Async</button>
        <button onClick={() => dispatch(incrementIfOddAsync(incrementAmount))}>Add If Odd</button>
      </div>
    </div>
  );
};
export default Counter;
