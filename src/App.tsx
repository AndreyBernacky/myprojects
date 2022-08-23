import React, {ChangeEvent, useState} from 'react';
import './App.css';

function App() {

    const [actValue, setActValue] = useState<number>(() => {
        const getStartValue = localStorage.getItem('startValue')
        if (getStartValue) {
            return JSON.parse(getStartValue)
        }
    })

    const [errorData, setErrorData] = useState<boolean>(false)

    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const [isMax, setIsMax] = useState<boolean>(false)

    const [maxValue, setMaxValue] = useState<number>(() => {
        const getMaxValue = localStorage.getItem('maxValue')
        if (getMaxValue) {
            return  JSON.parse(getMaxValue)
        }
    })
    const [startValue, setStartValue] = useState<number>(() => {
        const getStartValue = localStorage.getItem('startValue')
        if (getStartValue) {
            return JSON.parse(getStartValue)
        }
    })

    const maxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsDisabled(false)
        setMaxValue(parseInt(e.currentTarget.value))
        compare()
        console.log("max value = " + maxValue)
    }

    const startValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsDisabled(false)
        setStartValue(parseInt(e.currentTarget.value))
        console.log('startValue = ' + startValue + ' maxValue = ' + maxValue)
        compare()
    }

    const compare = () => {
        if (maxValue <= startValue) {
            setErrorData(true)
            setIsDisabled(true)
        }
        if (maxValue > startValue) {
            setErrorData(false)
            setIsDisabled(false)
        }
    }

    const setValuesHandler = () => {
        localStorage.removeItem('maxValue')
        localStorage.removeItem('startValue')
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))

        console.log('startValue in SET = ' + startValue + ' maxValue in SET = SET ' + maxValue)

        setActValue(startValue)
        setIsDisabled(true)
    }

    const incActValue = () => {

        setActValue(actValue + 1)
        if (actValue >= maxValue - 1) {
            setIsMax(true)
        }

    }
    const resetActValue = () => {
        setActValue(startValue)
        setIsMax(false)
    }

    return (
        <div>
            <div className="counterSet__block">
                <div>
                    <div>
                        <label>Enter Max Value
                            <input
                                type="number"
                                min={0}
                                value={maxValue}
                                onChange={maxValueHandler}
                            />
                        </label>
                        <label>Enter Start Value
                            <input
                                type="number"
                                min={0}
                                value={startValue}
                                onChange={startValueHandler}
                            />
                        </label>
                    </div>
                    <div>
                        <button disabled={isDisabled} onClick={setValuesHandler}>set</button>
                    </div>
                </div>
                <div className="counterShow__block">
                    <div>
                        {errorData && <h2>Enter Correct Data</h2>}

                        <h2>{isMax
                            ? <span style={{color: "red"}}>{actValue}</span>
                            : actValue}</h2>
                    </div>
                    <div>
                        <button onClick={incActValue} disabled={isMax}>inc</button>
                        <button onClick={resetActValue}>reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
