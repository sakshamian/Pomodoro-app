import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Timer from "@/components/Timer";
import About from "@/components/About";
import Alarm from "@/components/Alarm";
import SettingsModal from "@/components/SettingsModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [openSetting, setOpenSetting] = useState(false);
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [consumendSecond, setConsumedSecond] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const alarmRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();
  const pomodoroRef = useRef();

  const switchStage = (ind) => {
    const isYes = consumendSecond && stage !== ind ? confirm("Are you sure you want to switch?") : false;
    if (isYes) {
      reset();
      setStage(ind);
    } else if (!consumendSecond) {
      setStage(ind);
    }
  };

  const getTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };
    return timeStage[stage];
  };

  const updateTime = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak
    }
    return updateStage[stage];
  };

  const timeUp = () => {
    reset();
    setIsTimeUp(true);
    alarmRef.current.play();
  };
  const muteAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  }

  const reset = () => {
    setTicking(false);
    setSeconds(0);
    setPomodoro(25);
    setLongBreak(10);
    setShortBreak(5);
  };

  const clockTicking = () => {
    const minutes = getTime();
    const setMinutes = updateTime();

    if (minutes === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  };

  const startTimer = () => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking(ticking => !ticking);
  };

  const updateTimeDefaultValue = () => {
    setPomodoro(pomodoroRef.current.value);
    setShortBreak(shortBreakRef.current.value);
    setLongBreak(longBreakRef.current.value);
    setOpenSetting(false);
    setSeconds(0);
    setConsumedSecond(0);
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumendSecond ? "Show warning" : null;
    }
    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond(value => value + 1);
        clockTicking();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [seconds, pomodoro, shortBreak, longBreak, ticking]);

  return (
    <h1 className="bg-gray-900 min-h-screen font-inter">
      <div className="max-w-2xl min-h-screen mx-auto">
        <Navigation setOpenSetting={setOpenSetting} />
        <Timer
          stage={stage}
          setStage={switchStage}
          getTickingTime={getTime}
          seconds={seconds}
          ticking={ticking}
          setTicking={setTicking}
          startTimer={startTimer}
          reset={reset}
          muteAlarm={muteAlarm}
          isTimeUp={isTimeUp}
        />
        <About />

        <Alarm alarmRef={alarmRef} />

        <SettingsModal
          openSetting={openSetting}
          setOpenSetting={setOpenSetting}
          updateTimeDefaultValue={updateTimeDefaultValue}
          shortBreakRef={shortBreakRef}
          pomodoroRef={pomodoroRef}
          longBreakRef={longBreakRef}
        />
      </div>
    </h1>
  );
}
