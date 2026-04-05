import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const liveRef = useRef<HTMLDivElement>(null)

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++nextId
    setToasts((prev) => [...prev, { id, message, type }])

    // Update persistent aria-live region for screen readers
    if (liveRef.current) {
      liveRef.current.textContent = message
    }

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Persistent aria-live region — always in DOM so screen readers register it */}
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {toasts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={[
                'rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg',
                toast.type === 'success' ? 'bg-[#6fc54d]' : '',
                toast.type === 'error' ? 'bg-red-500' : '',
                toast.type === 'info' ? 'bg-[#064e3b]' : '',
              ].join(' ')}
              style={{ animation: 'toastSlideUp 300ms cubic-bezier(0.16, 1, 0.3, 1) both' }}
              role="status"
            >
              {toast.message}
            </div>
          ))}

          <style>{`
            @keyframes toastSlideUp {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
