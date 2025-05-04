import type { PropsWithChildren } from 'react'
import { PeerMentoringProvider } from './peer-mentoring'

export default function Providers({ children }: PropsWithChildren) {
  return <PeerMentoringProvider>{children}</PeerMentoringProvider>
}
