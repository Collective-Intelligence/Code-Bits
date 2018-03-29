import asyncio
import websockets

async def hello(websocket, path):
	data = await websocket.recv()

	recieved = "Received ({})".format(data)
	await websocket.send(recieved)
	print("{}\n".format(recieved))

start_server = websockets.serve(hello, 'localhost', 8765)

print("Running")

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()