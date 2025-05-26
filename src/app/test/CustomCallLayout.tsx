import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'

const CustomCallLayout = () => {
  const { useParticipants } = useCallStateHooks()
  const participants = useParticipants()

  return (
    <div className="custom-call-layout">
      {participants.map(participant => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  )
}

export default CustomCallLayout
