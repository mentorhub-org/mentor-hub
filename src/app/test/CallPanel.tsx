import {
  AcceptCallButton,
  CallingState,
  CancelCallButton,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk'
import CustomCallLayout from './CustomCallLayout'

const CallPanel = () => {
  const call = useCall()
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (!call) return null

  if (callingState === CallingState.JOINED) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <CustomCallLayout />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            <CancelCallButton />
          </div>
        </div>
      </div>
    )
  } else if (
    [CallingState.RINGING, CallingState.JOINING].includes(callingState)
  ) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-white text-xl flex flex-col items-center gap-4">
          {callingState === CallingState.RINGING
            ? 'Incoming call...'
            : 'Joining call...'}
          {callingState === CallingState.RINGING && (
            <div className="flex gap-4">
              <AcceptCallButton
                onClick={() => {
                  call.join()
                }}
              />
              <CancelCallButton
                onClick={() => {
                  const reason = call.isCreatedByMe ? 'cancel' : 'decline'
                  call.leave({ reject: true, reason })
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

export default CallPanel
