'use client'

import { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

export function TargetIcon({ className = '', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path
        d="M12 2 L12 5 M12 19 L12 22 M2 12 L5 12 M19 12 L22 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChartIcon({ className = '', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M7 17 L9.5 13 L12 10 L15 7 L17 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="9.5" cy="13" r="1.5" fill="currentColor" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="7" r="1.5" fill="currentColor" />
      <circle cx="17" cy="5" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function BoltIcon({ className = '', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M13 2 L4 14 L12 14 L11 22 L20 10 L12 10 L13 2 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RefreshIcon({ className = '', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 12 C3 7.029 7.029 3 12 3 C15.866 3 19.177 5.335 20.708 8.708"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M21 12 C21 16.971 16.971 21 12 21 C8.134 21 4.823 18.665 3.292 15.292"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20.708 8.708 L17 5 L20.708 1.292"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3.292 15.292 L7 19 L3.292 22.708"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

