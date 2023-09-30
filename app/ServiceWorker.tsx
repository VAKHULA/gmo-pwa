'use client'
import { useEffect } from "react"

export const ServiceWorker = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register("/serviceworker.js");
         }
    }, [])

    return null
}