import { useState } from "react"
import { Block } from "@tanstack/react-router"

export function Blocker() {
    const [blockCondition, setBlockCondition] = useState(false)
    return <Block blockerFn={() => windows.confirm("Are you sure you want to leave?")} condition={blockCondition} />
}

