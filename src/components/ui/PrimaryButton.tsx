import { ButtonHTMLAttributes } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({ className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex h-14 items-center justify-center bg-lime px-10 font-body text-base font-semibold tracking-[0.025em] text-softWhite transition hover:brightness-95 ${className}`}
      {...props}
    />
  )
}
