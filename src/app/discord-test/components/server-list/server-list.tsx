import Image from 'next/image'

export default function ServerList() {
  const servers: peerMentoringServers[] = [
    {
      id: '1',
      name: 'Peer Mentoring',
      image: undefined,
    },
    {
      id: '2',
      name: 'Peer Mentoring',
      image: undefined,
    },
  ]
  return (
    <div className="bg-dark-grey h-full flex flex-col items-center">
      {servers.map(server => (
        <button key={server.id} onClick={() => console.log(server.name)}>
          {server.image && checkIfUrl(server.image) ? (
            <Image
              src={server.image}
              width={50}
              height={50}
              alt="Server Icon"
            />
          ) : (
            <span className="rounded-icon bg-gray-600 w-[50px] flex items-center justify-center text-sm">
              {server.name.charAt(0)}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

type peerMentoringServers = {
  id: string
  name: string
  image: string | undefined
}

function checkIfUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}
