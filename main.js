const socket = io("ws://wdsk-queue.ddns.net:9375")

var current_view = "tracks"

var tracksElem = new Elem("tracks")
var historyElem = new Elem("history")
var bangersElem = new Elem("bangers")
var boardElem = new Elem("board")

function renderEntireQueue(queue_data) {
	print("Update: ", queue_data)
	tracksElem.clear()
	historyElem.clear()
	bangersElem.clear()
	boardElem.clear()

	// Render Active Queue
	queue_data.tracks.filter(queueObj => !queueObj.history).forEach((queueObj, queueInd) => {
		print(queueInd, queue_data.now_playing)
		var queueElem = renderQueueObj(queueObj, [
			queueObjButton("Open in New Tab", "open_in_new", () => {
				window.open(queueObj.url, "_blank")
			}),
			queueObjButton("Copy Link", "link", () => {
				copyTextToClipboard(queueObj.url)
			}),
		], (queueInd == queue_data.now_playing))
		tracksElem.addChild(queueElem)
	})

	// Render History
	queue_data.tracks.filter(queueObj => queueObj.history).forEach((queueObj, queueInd) => {
		var queueElem = renderQueueObj(queueObj, [
			queueObjButton("Open in New Tab", "open_in_new", () => {
				window.open(queueObj.url, "_blank")
			}),
			queueObjButton("Copy Link", "link", () => {
				copyTextToClipboard(queueObj.url)
			}),
		])
		historyElem.addChild(queueElem)
	})

	// Render Bangers...
	// Render Board...
}

var mainElem = new Elem("main")
function changeView(view) {
	mainElem.children.forEach(child => {
		if (child.id == view ) {
			child.style["display"] = ""
		} else {
			child.style["display"] = "none"
		}
	})

	document.title = `WDSK Viewer Panel - ${titleCase(view)}`
}
changeView("tracks")


//// BUTTON HANDLING ////
mainElem.children.forEach(child => {
	new Elem(`top-${child.id}`).on("click", e => {
		changeView(child.id)
	})
})


//// SOCKET HANDLING ////
socket.on("connect", () => {
	socket.emit("request_queue")
})

socket.on("request_queue", renderEntireQueue)
socket.on("queue_update", renderEntireQueue)