import { useEffect, useState } from 'react'

export type DeviceTier = 'high' | 'medium' | 'low'

export interface DeviceCapability {
  tier: DeviceTier
  prefersReducedMotion: boolean
  isMobile: boolean
}

const SSR_DEFAULT: DeviceCapability = {
  tier: 'high',
  prefersReducedMotion: false,
  isMobile: false,
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(SSR_DEFAULT)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    const cores = navigator.hardwareConcurrency ?? 4
    const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8
    const connection = (navigator as { connection?: { effectiveType?: string } }).connection
    const slowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === '3g'

    let tier: DeviceTier = 'high'
    if (slowConnection || cores <= 4 || memory <= 4) {
      tier = 'low'
    } else if (isMobile) {
      tier = 'medium'
    }

    setCapability({ tier, prefersReducedMotion, isMobile })
  }, [])

  return capability
}
