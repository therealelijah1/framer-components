import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Animates a number from `from` to `to` when it scrolls into view.
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function CountUp({ from = 0, to = 100, duration = 1.5, prefix = "", suffix = "", font, color }) {
    const [value, setValue] = useState(from)
    const ref = useRef<HTMLSpanElement>(null)
    const started = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || started.current) return
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
                const t = Math.min((now - start) / (duration * 1000), 1)
                const eased = 1 - Math.pow(1 - t, 3)
                setValue(Math.round(from + (to - from) * eased))
                if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [from, to, duration])

    return (
        <span ref={ref} style={{ ...font, color }}>
            {prefix}
            {value.toLocaleString()}
            {suffix}
        </span>
    )
}

addPropertyControls(CountUp, {
    from: { type: ControlType.Number, defaultValue: 0 },
    to: { type: ControlType.Number, defaultValue: 100 },
    duration: { type: ControlType.Number, defaultValue: 1.5, step: 0.1, min: 0.1 },
    prefix: { type: ControlType.String, defaultValue: "" },
    suffix: { type: ControlType.String, defaultValue: "" },
    font: { type: ControlType.Font, controls: "extended" },
    color: { type: ControlType.Color, defaultValue: "#111" },
})
