import { useEffect, useState } from 'react'
import { StreamChat, TokenProvider, User } from 'stream-chat'

export type UseClientOptions = {
  apiKey: string
  user: User
  token?: TokenProvider
}

export const useClient = ({ apiKey, user, token }: UseClientOptions) => {
  const [client, setClient] = useState<StreamChat | null>(null)

  useEffect(() => {
    const client = new StreamChat(apiKey)
    let didUserConnectInterrupt = false

    const connectionPromise = client.connectUser(user, token).then(() => {
      if (!didUserConnectInterrupt) {
        setClient(client)
      }
    })

    return () => {
      didUserConnectInterrupt = true
      setClient(null)

      connectionPromise
        .then(() => {
          if (client) {
            client.disconnectUser()
          }
        })
        .then(() => {
          console.log('User disconnected')
        })

      if (client) {
        client.disconnectUser()
      }
    }
  }, [apiKey, user, token])

  return client
}
