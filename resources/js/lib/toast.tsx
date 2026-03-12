import { sileo } from "sileo"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info
} from "lucide-react"
import { ReactNode } from "react"

type ToastType = "success" | "error" | "warning" | "info"

type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

interface ToastOptions {
  type?: ToastType
  title: string
  description?: ReactNode
  position?: ToastPosition
  fill?: string
  styles?: Record<string, string>
}

const baseStyles = {
  title: "text-white!",
  description: "text-white/70!"
}

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  error: <XCircle className="w-5 h-5 text-red-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />
}

const fillColors: Record<ToastType, string> = {
  success: "#171717",
  error: "#171717",
  warning: "#171717",
  info: "#171717"
}

export function toast({
  type = "info",
  title,
  description,
  position,
  fill,
  styles
}: ToastOptions) {

  const options = {
    title,
    description,
    icon: icons[type],
    position: position ?? "top-right",
    fill: fill ?? fillColors[type],
    styles: {
      ...baseStyles,
      ...(styles ?? {})
    }
  }

  switch (type) {

    case "success":
      sileo.success(options)
      break

    case "error":
      sileo.error(options)
      break

    case "warning":
      sileo.warning(options)
      break

    default:
      sileo.info(options)

  }
}