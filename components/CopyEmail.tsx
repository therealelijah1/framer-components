import { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Button that copies an email address and confirms with a short label change.
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function CopyEmail({ email = "hello@example.com", copiedLabel = "Copied!", background = "#111", color = "#fff" }) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            window.location.href = `mailto:${email}`
        }
    }

    return (
        <button
            onClick={copy}
            style={{ background, color, border: 0, borderRadius: 999, padding: "12px 20px", font: "600 15px Inter, sans-serif", cursor: "pointer" }}
        >
            {copied ? copiedLabel : email}
        </button>
    )
}

addPropertyControls(CopyEmail, {
    email: { type: ControlType.String, defaultValue: "hello@example.com" },
    copiedLabel: { type: ControlType.String, defaultValue: "Copied!" },
    background: { type: ControlType.Color, defaultValue: "#111" },
    color: { type: ControlType.Color, defaultValue: "#fff" },
})
