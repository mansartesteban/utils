export const randomNumber = (min, max) => Math.random() * (max - min) + min
export const lerp = (from, to, factor) => to * (1 - factor) + from * factor