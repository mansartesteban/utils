import { randomNumber } from "./utils/Algebra"

export default (element, useMouse) => {
    let position = {
        x: 0,
        y: 0
    }
    let target = {
        x: 0,
        y: 0
    }

    if (useMouse) {
        window.addEventListener("mousemove", (e) => {
            newTarget(e.clientX, e.clientY)
        })
    }

    const loop = () => {
        let factor = .02

        position.x = position.x * (1 - factor) + target.x * factor
        position.y = position.y * (1 - factor) + target.y * factor
        element.style.top = `${position.y}px`
        element.style.left = `${position.x}px`

        window.requestAnimationFrame(loop)
    }

    const newTarget = (x, y) => {
        target.x = x
        target.y = y
    }

    const newRandomTarget = () => {
        let x = randomNumber(window.innerWidth * .2, window.innerWidth - window.innerWidth * .2)
        let y = randomNumber(window.innerHeight * .2, window.innerHeight - window.innerHeight * .2)

        newTarget(x, y)
    }

    loop()

    return { newTarget, newRandomTarget }

}