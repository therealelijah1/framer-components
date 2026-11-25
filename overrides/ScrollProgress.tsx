import type { ComponentType } from "react"
import { useScroll, useSpring } from "framer-motion"

/**
 * Apply to a thin full-width frame pinned to the top of the page.
 * It scales horizontally with page scroll progress.
 */
export function withScrollProgress(Component): ComponentType {
    return (props) => {
        const { scrollYProgress } = useScroll()
        const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
        return <Component {...props} style={{ ...props.style, scaleX, transformOrigin: "0% 50%" }} />
    }
}
