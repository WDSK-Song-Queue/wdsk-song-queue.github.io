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