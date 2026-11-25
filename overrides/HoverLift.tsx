import type { ComponentType } from "react"

/**
 * Lifts a card slightly on hover with a soft shadow. Apply to card frames.
 */
export function withHoverLift(Component): ComponentType {
    return (props) => (
        <Component
            {...props}
            whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />
    )
}
