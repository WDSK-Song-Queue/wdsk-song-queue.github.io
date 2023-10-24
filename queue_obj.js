function renderQueueObj(queueObj, buttons = [], now_playing = false) {
	var frameElem = new Elem("div")
	frameElem.classes.add("queue-obj-frame")
	if (now_playing) { frameElem.setAttr("nowplaying", "") }

	// Top frame
	var topFrameElem = new Elem("div")
	topFrameElem.classes.add("queue-obj-top-frame")

	var titleElem = new Elem("p")
	titleElem.text = queueObj.track.title
	titleElem.classes.add("queue-obj-title")

	var authorElem = new Elem("p")
	authorElem.text = queueObj.track.author.name
	authorElem.classes.add("queue-obj-author")

	var queuerElem = new Elem("p")
	queuerElem.text = queueObj.queuer
	queuerElem.classes.add("queue-obj-queuer")

	topFrameElem.addChild(titleElem)
	topFrameElem.addChild(authorElem)
	topFrameElem.addChild(queuerElem)

	// Bottom frame
	var bottomFrameElem = new Elem("div")
	bottomFrameElem.classes.add("queue-obj-bottom-frame")

	buttons.forEach(buttonObj => {
		var buttonElem = new Elem("span")

		buttonElem.classes.add("material-icons")
		buttonElem.classes.add("queue-obj-button")

		buttonElem.text = buttonObj.icon

		buttonElem.setAttr("title", buttonObj.name)

		buttonElem.on("click", buttonObj.click)

		bottomFrameElem.addChild(buttonElem)
	})


	frameElem.addChild(topFrameElem)
	frameElem.addChild(bottomFrameElem)

	return frameElem
}

function queueObjButton(name, icon, click) { return {name, icon, click} }

function renderBoardMember(name, count, placing, click = null) {
	var frameElem = new Elem("div")

	var nameElem = new Elem("p")
	var countElem = new Elem("p")
	var emblemElem = new Elem("div")

	frameElem.classes.add("board-member-frame")
	frameElem.setAttr("placing", placing)

	nameElem.text = name
	nameElem.classes.add("board-member-name")

	countElem.text = count
	countElem.classes.add("board-member-count")

	emblemElem.classes.add("board-member-emblem")
	switch (placing) {
		case 1:
			emblemElem.style["background-image"] = `url(assets/1st.png)`
		break;
		case 2:
			emblemElem.style["background-image"] = `url(assets/2nd.png)`
		break;
		case 3:
			emblemElem.style["background-image"] = `url(assets/3rd.png)`
		break;
		default:
			emblemElem.style["background-image"] = ``
		break;
	}

	if (click) { frameElem.on("click", click) }

	frameElem.addChild(emblemElem)
	frameElem.addChild(nameElem)
	frameElem.addChild(countElem)

	return frameElem
}

function getBangerCount(member, data_set = QueueStorage.data) {
	return data_set.tracks.filter(queueObj => {
		return (queueObj.queuer == member && queueObj.banger != null)
	}).length
}