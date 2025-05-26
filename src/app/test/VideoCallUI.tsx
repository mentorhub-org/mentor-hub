import { StreamCall, useCalls } from '@stream-io/video-react-sdk'
import CallPanel from './CallPanel'

// Video component to handle call UI
const VideoCallUI = () => {
  const calls = useCalls()

  return (
    <>
      {calls.map(call => (
        <StreamCall call={call} key={call.cid}>
          <CallPanel />
        </StreamCall>
      ))}
    </>
  )
}

export default VideoCallUI
