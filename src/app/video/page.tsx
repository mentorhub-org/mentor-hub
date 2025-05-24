'use client'

import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk'

import '@stream-io/video-react-sdk/dist/css/styles.css'

const apiKey = 'mmhfdzb5evj2'
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1RhbG9uX0thcnJkZSIsInVzZXJfaWQiOiJUYWxvbl9LYXJyZGUiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTc0ODAzNDg0NiwiZXhwIjoxNzQ4NjM5NjQ2fQ.qSnu5c_uxgQjMBsZ8FSfjuSmz9nTDdA-8OwhSVSAGiA'
const userId = 'Talon_Karrde'
const callId = 'iLvUBRij7q8M'

const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
}

const client = new StreamVideoClient({ apiKey, user, token })
const call = client.call('default', callId)
call.join({ create: true })

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  )
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  )
}
