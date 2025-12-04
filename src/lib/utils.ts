import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COLEMAK: Record<string, string> = {
  q: "q",
  w: "w",
  e: "f",
  r: "p",
  t: "g",
  y: "j",
  u: "l",
  i: "u",
  o: "y",
  p: ";",

  a: "a",
  s: "r",
  d: "s",
  f: "t",
  g: "d",
  h: "h",
  j: "n",
  k: "e",
  l: "i",
  ";": "o",

  z: "z",
  x: "x",
  c: "c",
  v: "v",
  b: "b",
  n: "k",
  m: "m",
  ",": ",",
  ".": ".",
  "/": "/",
};

export const DVORAK: Record<string, string> = {
  q: "'",
  w: ",",
  e: ".",
  r: "p",
  t: "y",
  y: "f",
  u: "g",
  i: "c",
  o: "r",
  p: "l",
  "[": "/",
  "]": "=",

  a: "a",
  s: "o",
  d: "e",
  f: "u",
  g: "i",
  h: "d",
  j: "h",
  k: "t",
  l: "n",
  ";": "s",
  "'": "-",

  z: ";",
  x: "q",
  c: "j",
  v: "k",
  b: "x",
  n: "b",
  m: "m",
  ",": "w",
  ".": "v",
  "/": "z",
};

export const KEYBOARD_LAYOUTS = {
  qwerty: (key: string) => key,
  colemak: (key: string) => COLEMAK[key] || key,
  dvorak: (key: string) => DVORAK[key] || key,
};
