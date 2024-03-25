import React from 'react'
import { FiX } from 'react-icons/fi'

const SettingsModal = ({ setOpenSetting, openSetting, updateTimeDefaultValue, pomodoroRef, shortBreakRef, longBreakRef }) => {

    const inputs = [
        {
            value: "Pomodoro",
            ref: pomodoroRef,
            defaultValue: 25
        },
        {
            value: "Short Break",
            ref: shortBreakRef,
            defaultValue: 5
        },
        {
            value: "Long Break",
            ref: longBreakRef,
            defaultValue: 10
        },
    ];
    return (
        <>
            <div className={`absolute h-full w-full left-0 top-0 bg-black bg-opacity-30 ${openSetting ? "" : "hidden"
                }`}
                onClick={() => setOpenSetting(false)}
            >
            </div>
            <div
                className={`max-w-xl bg-white absolute sm:w-96 w-11/12 left-1/2 top-1/2 p-5 rounded-md ${openSetting ? "" : "hidden"
                    }`}
                style={{
                    transform: "translate(-50%,-50%)",
                }}
            >
                <div className="text-gray-400 flex justify-between items-center">
                    <h1 className="uppercase font-bold tracking-wider">Time setting</h1>
                    <FiX
                        className="text-2xl cursor-pointer"
                        onClick={() => setOpenSetting(false)}
                    />
                </div>
                <div className="h-1 w-full bg-gray-400 mt-5 mb-5"></div>
                <div className='flex gap-5 justify-around'>
                    {inputs.map((ele, ind) => {
                        return (
                            <div key={ind}>
                                <h1 className="text-gray-400 text-sm">{ele.value}</h1>
                                <input
                                    type='number'
                                    defaultValue={ele.defaultValue}
                                    ref={ele.ref}
                                    className="w-full bg-gray-400 bg-opacity-30 py-2 rounded outline-none text-center text-black"
                                />
                            </div>
                        )
                    })}
                </div>
                <button
                    className="bg-green-500 uppercase w-full mt-5 text-white rounded py-2"
                    onClick={updateTimeDefaultValue}
                >
                    Save
                </button>
            </div>
        </>
    )
}

export default React.memo(SettingsModal);