import { useState, useEffect, useRef, useCallback } from "react";
import { throttle } from "es-toolkit";
import { useTypingStore } from "@/store/store";

interface EventInterface {
  index: number;
  expected: string;
  pressed: string;
  isCorrect: boolean;
  timestamp: number;
}

export const useTypingStats = () => {
  const saveStats = useTypingStore(state => state.saveStats);

  const [wps, setWps] = useState<number | null>(null);
  const [rawWps, setRawWps] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [errors, setErrors] = useState<EventInterface[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "running" | "finished">("idle");
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);

  const wpsRef = useRef(wps);
  const rawWpsRef = useRef(rawWps);
  const accuracyRef = useRef(accuracy);
  const streakRef = useRef(streak);
  const maxStreakRef = useRef(maxStreak);

  useEffect(() => { wpsRef.current = wps; }, [wps]);
  useEffect(() => { rawWpsRef.current = rawWps; }, [rawWps]);
  useEffect(() => { accuracyRef.current = accuracy; }, [accuracy]);
  useEffect(() => { streakRef.current = streak; }, [streak]);
  useEffect(() => { maxStreakRef.current = maxStreak; }, [maxStreak]);

  useEffect(() => {
    if (status === "idle") return;

    saveStats({
      status,
      wps: wpsRef.current,
      rawWps: rawWpsRef.current,
      accuracy: accuracyRef.current ?? 100,
      streak: streakRef.current,
      maxStreak: maxStreakRef.current,
      // errors: status === "finished" ? errors : undefined,
    });
  }, [
    status,
    wps,
    rawWps,
    accuracy,
    streak,
    maxStreak,
    errors.length,
  ]);

  const removeEvent = (index: number) => {
    setEvents((prev) => prev.filter(ev => ev.index !== index))
  }

  // Throttles
  const calculateAccuracy = useCallback(
    throttle((eventsArr: EventInterface[]) => {
      if (eventsArr.length === 0) {
        setAccuracy(100);
        return;
      }
      const correct = eventsArr.filter(e => e.isCorrect).length;
      setAccuracy((correct / eventsArr.length) * 100);
    }, 500),
    []
  );

  const calculateWps = useCallback(
    throttle((eventsArr: EventInterface[], start: number | null, end?: number) => {
      if (!start) return;
      const now = end ?? Date.now();
      const seconds = (now - start) / 1000;
      if (seconds <= 0) return;

      const correctChars = eventsArr.filter(e => e.isCorrect).length;
      const totalChars = eventsArr.length;

      const wpm = (correctChars / 5) * (60 / seconds);
      const raw = (totalChars / 5) * (60 / seconds);

      setWps(Math.round(wpm) || 0);
      setRawWps(Math.round(raw) || 0);
    }, 800),
    []
  );

  const checkStreak = useCallback((event: EventInterface) => {
    if (!event.isCorrect) {
      setStreak(0);
      return;
    }
    setStreak(prev => {
      const next = prev + 1;
      setMaxStreak(m => Math.max(m, next));
      return next;
    });
  }, []);

  const startSession = () => {
    if (status !== "idle") return;
    const now = Date.now();
    setStartTime(now);
    setStatus("running");
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

    calculateWps(newEvents, startTime);
    calculateAccuracy(newEvents);
  };

  const finishSession = useCallback(() => {
    if (status !== "running") return;

    const endTime = Date.now();
    setStatus("finished");

    calculateWps.flush();
    calculateAccuracy.flush();

    if (startTime && events.length > 0) {
      const seconds = (endTime - startTime) / 1000;
      const correctChars = events.filter(e => e.isCorrect).length;
      const totalChars = events.length;

      const finalWpm = (correctChars / 5) * (60 / seconds);
      const finalRaw = (totalChars / 5) * (60 / seconds);
      const finalAcc = (correctChars / totalChars) * 100;

      setWps(Math.round(finalWpm) || 0);
      setRawWps(Math.round(finalRaw) || 0);
      setAccuracy(finalAcc);
    }
  }, [status, startTime, events, calculateWps, calculateAccuracy]);

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
  };

  return {
    wps,
    rawWps,
    accuracy,
    errors,
    streak,
    maxStreak,
    startSession,
    registerKeyEvent,
    finishSession,
    resetSession,
    removeEvent,
  };
};
