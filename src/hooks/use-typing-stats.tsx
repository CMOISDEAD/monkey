import { useState } from "react";
import { throttle } from "es-toolkit/function";
import { useTypingStore } from "@/store/store";

interface EventInterface {
  index: number;
  expected: string;
  pressed: string;
  isCorrect: boolean;
  timestamp: number;
}

export const useTypingStats = () => {
  // global store
  const { stats, saveStats } = useTypingStore(state => state)

  const [wps, setWps] = useState<number | null>(null);
  const [rawWps, setRawWps] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [errors, setErrors] = useState<EventInterface[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  // session state
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);

  const calculateAccuracy = throttle((eventsArr: EventInterface[]) => {
    if (eventsArr.length === 0) {
      setAccuracy(100);
      return;
    }

    const corrects = eventsArr.filter(ev => ev.isCorrect).length;
    setAccuracy((corrects / eventsArr.length) * 100);
  }, 1000);

  const calculateWps = throttle(
    (eventsArr: EventInterface[], start: number | null, end: number | null) => {
      if (!start) return;

      const now = end ?? Date.now();
      const seconds = (now - start) / 1000;

      if (seconds <= 0) return;

      const correctsChars = eventsArr.filter(ev => ev.isCorrect).length;
      const totalChars = eventsArr.length;

      const wpm = (correctsChars * 60) / (5 * seconds);
      const raw = (totalChars * 60) / (5 * seconds);

      setWps(Number.isFinite(wpm) ? wpm : 0);
      setRawWps(Number.isFinite(raw) ? raw : 0);

      saveStats({
        ...stats,
        wps,
        rawWps
      })
    },
    1000
  );

  const checkStreak = (event: EventInterface) => {
    if (!event.isCorrect) {
      setStreak(0);
      return;
    }

    setStreak(prev => {
      const next = prev + 1;
      setMaxStreak(m => Math.max(m, next));
      return next;
    });

    saveStats({
      ...stats,
      streak,
      maxStreak
    })
  };


  const startSession = () => {
    if (status !== "idle") return;

    const now = Date.now();
    setStartTime(now);
    setStatus("running");

    // reset runtime stats
    setEvents([]);
    setErrors([]);
    setStreak(0);
    setMaxStreak(0);
    setWps(null);
    setRawWps(null);
    setAccuracy(null);
  };

  const registerKeyEvent = (data: Omit<EventInterface, "timestamp">) => {
    if (status !== "running") return;

    const event: EventInterface = { ...data, timestamp: Date.now() };
    const newEvents = [...events, event];

    setEvents(newEvents);

    checkStreak(event);

    if (!event.isCorrect) {
      setErrors(prev => [...prev, event]);
    }

    calculateWps(newEvents, startTime, null);
    calculateAccuracy(newEvents);
  };

  const finishSession = () => {
    console.log("entro en finishSession con status:", status)
    if (status !== "running") return;

    const end = Date.now();
    setStatus("finished");

    calculateWps(events, startTime, end);
    calculateAccuracy(events);

    saveStats({
      status,
      wps,
      rawWps,
      accuracy,
      streak,
      maxStreak,
    })
  };

  const resetSession = () => {
    setStatus("idle");
    setStartTime(null);

    setEvents([]);
    setErrors([]);
    setStreak(0);
    setMaxStreak(0);
    setWps(null);
    setRawWps(null);
    setAccuracy(null);

    saveStats({
      status: "idle",
      wps: null,
      rawWps: null,
      accuracy: null,
      streak: 0,
      maxStreak: 0,
    })
  };

  return {
    wps,
    rawWps,
    accuracy,
    errors,
    streak,
    maxStreak,

    // methods
    startSession,
    registerKeyEvent,
    finishSession,
    resetSession,
  };
};

