'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const Input = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState<string>(searchParams.get('s') || '')
  useEffect(() => {
    console.log(value)
    router.push(`/?s=${value}`)
  }, [value, router])
  return (
    <div className="form-group">
      <input
        type="search"
        placeholder="search ..."
        onChange={(e) => {
            setValue(e.target.value)
        }}
        value={value}
      />
    </div>
  )
}