const socket = io("wss://wdsk-control-panel.donovanedwards.repl.co")

var current_view = "tracks"

var tracksElem = new Elem("tracks")
var historyElem = new Elem("history")
var bangersElem = new Elem("bangers")
var boardElem = new Elem("board")

function renderEntireQueue(queue_data) {
	print("Update: ", queue_data)
	var tracksArr = []
	tracksElem.clear()
	var historyArr = []
	historyElem.clear()
	var bangersArr = []
	bangersElem.clear()
	var boardArr = []
	boardElem.clear()

	// Render Active Queue
	queue_data.tracks.forEach((queueObj, queueInd) => {
		if (queueObj.played == null) {
			var queueElem = renderQueueObj(queueObj, [
				queueObjButton("Open in New Tab", "open_in_new", () => {
					window.open(queueObj.url, "_blank")
				}),
				queueObjButton("Copy Link", "link", () => {
					copyTextToClipboard(queueObj.url)
				}),
			], (queueInd == queue_data.now_playing))
			tracksElem.addChild(queueElem)
		} else {
			var queueElem = renderQueueObj(queueObj, [
				queueObjButton("Open in New Tab", "open_in_new", () => {
					window.open(queueObj.url, "_blank")
				}),
				queueObjButton("Copy Link", "link", () => {
					copyTextToClipboard(queueObj.url)
				}),
			])
			// historyElem.addChild(queueElem)
			historyArr.push({obj: queueObj, elem: queueElem})
		}

		if (queueObj.banger != null) {
			var queueElem = renderQueueObj(queueObj, [
				queueObjButton("Open in New Tab", "open_in_new", () => {
					window.open(queueObj.url, "_blank")
				}),
				queueObjButton("Copy Link", "link", () => {
					copyTextToClipboard(queueObj.url)
				}),
			], (queueInd == queue_data.now_playing))
			// bangersElem.addChild(queueElem)
			bangersArr.push({obj: queueObj, elem: queueElem})
		}
	})

	historyArr.sort((a, b) => { return (a.obj.sort - b.obj.sort) })
	historyArr.forEach(value => {
		historyElem.addChild(value.elem)
	})

	bangersArr.sort((a, b) => { return (a.obj.sort - b.obj.sort) })
	bangersArr.forEach(value => {
		bangersElem.addChild(value.elem)
	})

	var board_members = Object.keys(queue_data.board)
	board_members.sort((a, b) => { return getBangerCount(b, queue_data) - getBangerCount(a, queue_data) })

	var places = Array.from(new Set(board_members.map(key => {return getBangerCount(key, queue_data)})))
	places.sort((a, b) => { return b - a })

	board_members.forEach((member, ind, arr) => {
		var nickname = queue_data.board[member]
		var count = getBangerCount(member, queue_data)
		var placing = (places.indexOf(count)+1)

		var memberElem = renderBoardMember(nickname, count, placing)

		boardElem.addChild(memberElem)
	})
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