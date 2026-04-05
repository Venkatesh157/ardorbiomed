import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/919488828030'

export default function WhatsAppButton() {
  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2"
        style={{ animation: 'whatsappPulse 2.5s ease-in-out infinite' }}
      >
        <MessageCircle size={26} strokeWidth={1.75} fill="white" />
      </a>

      <style>{`
        @keyframes whatsappPulse {
          0%, 100% {
            box-shadow:
              0 8px 25px rgba(37, 211, 102, 0.45),
              0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          60% {
            box-shadow:
              0 8px 25px rgba(37, 211, 102, 0.45),
              0 0 0 12px rgba(37, 211, 102, 0);
          }
        }
      `}</style>
    </>
  )
}
