import { initSocket } from '@/lib/socket'
import { Server as HTTPServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as SocketServer } from 'socket.io'

interface ExtendedNextApiResponse extends Omit<NextApiResponse, 'socket'> {
  socket: {
    server: HTTPServer & {
      io?: SocketServer
    }
  }
}

let io: SocketServer | undefined

export default function handler(
  _req: NextApiRequest,
  res: ExtendedNextApiResponse,
) {
  if (!res.socket.server.io) {
    const httpServer: HTTPServer = res.socket.server
    io = initSocket(httpServer)
    res.socket.server.io = io
  }
  res.end()
}
