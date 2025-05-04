'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

type PeerMentoringState = {}

const initialState: PeerMentoringState = {}

const PeerMentoringContext = createContext<PeerMentoringState>(initialState)

type Props = {
  children: ReactNode
}

export function PeerMentoringProvider({ children }: Props) {
  const [state, setState] = useState<PeerMentoringState>(initialState)

  return (
    <PeerMentoringContext.Provider value={state}>
      {children}
    </PeerMentoringContext.Provider>
  )
}

export function usePeerMentoring() {
  const context = useContext(PeerMentoringContext)

  if (!context) {
    throw new Error(
      'usePeerMentoring must be used within a PeerMentoringProvider',
    )
  }

  return context
}
