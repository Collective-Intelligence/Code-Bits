import asyncio
import websockets

async def hello():
	async with websockets.connect("ws://localhost:8765") as websocket:
		data = input("What would you like to send? ")
		await websocket.send(data)
		print("Sent ({})".format(data))

		response = await websocket.recv()
		print("{}".format(response))

asyncio.get_event_loop().run_until_complete(hello())