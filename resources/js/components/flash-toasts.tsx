import { useEffect } from "react"
import { usePage } from "@inertiajs/react"
import { toast } from "@/lib/toast"

export default function FlashToasts() {
    const { props }: any = usePage()
    const flashToast = props.flash?.toast
    console.log('FlashToasts render:', flashToast)

    useEffect(() => {
        if (!flashToast) return
        toast(flashToast)
    }, [flashToast])

    return null
}