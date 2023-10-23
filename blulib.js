// BLUTO LIBRARY //

class Elem {
	constructor(arg) {
		this._prevEvents = {}

		if (typeof arg == "string") {
			this.elem = document.getElementById(arg)
			if (this.elem == null) {
				this.elem = document.createElement(arg)
			}
		} else {
			this.elem = arg
		}

		this.classes = {
			add: arg => {
				this.elem.classList.add(arg)
			},
			remove: arg => {
				this.elem.classList.remove(arg)
			},
		}
	}

	// METHODS //

	delete() {
		this.elem.remove()
	}

	on(events, callback) {
		if (!Array.isArray(events)) {events = [events]}
		events.forEach(event => {
			if (!Array.isArray(this._prevEvents[event])) { this._prevEvents[event] = [] }
			this._prevEvents[event].push(callback)
			// print(this._prevEvents)
			this.elem.addEventListener(event, callback)
		})
	}

	notOn(events, ind = null) {
		if (!Array.isArray(events)) {events = [events]}
		events.forEach(event => {
			if (this._prevEvents[event] != null) {
				if (ind == null) {
					this._prevEvents[event].forEach(callback => {
						this.elem.removeEventListener(event, callback)
						this._prevEvents[event].remove(0)
					})
				} else {
					this.elem.removeEventListener(event, this._prevEvents[event][ind])
					this._prevEvents[event].remove(ind)
				}
			}
		})
	}

	clear() {
		this.elem.replaceChildren()
	}

	addChild(child) {
		this.elem.appendChild(child.elem)
	}

	// SPECIAL VALUES //

    set id(val) {
        this.elem.id = val;
    }

    get id() {
        return this.elem.id;
    }

    set text(val) {
        this.elem.textContent = val;
    }

    get text() {
        return this.elem.textContent;
    }

    set src(val) {
        this.elem.src = val;
    }

    get src() {
        return this.elem.src;
    }

    set html(val) {
        this.elem.innerHTML = val;
    }

    get html() {
        return this.elem.innerHTML;
    }

    set style(val) {
        this.elem.style = val;
    }

    get style() {
        return this.elem.style;
    }

    setAttr(key, val) {
        this.elem.setAttribute(key, val)
    }

    getAttr(key) {
        return this.elem.getAttribute(key);
    }

    get width() {
    	return this.elem.getBoundingClientRect().height
    }

    get height() {
    	return this.elem.getBoundingClientRect().height
    }

    get children() {
        return Array.from(this.elem.children).map(element => new Elem(element));
    }

    set href(val) {
    	this.elem.setAttribute("href", val)
    }

    get href() {
    	this.elem.getAttribute("href")
    }
}

const InputFields = {
	text: () => {
		let elem = new Element("input")
		elem.setAttribute("type", "text")
		elem.value = () => {
			return elem.value
		}
		return elem
	},
	number: (...args) => {
		let elem = new Element("input")
		elem.setAttribute("type", "number")
		elem.setAttribute("min", args[0])
		elem.setAttribute("max", args[1])
		elem.value = () => {
			return elem.value
		}
		return elem
	},
}

class InputPrompt {
	constructor(arg) {
		Object.keys(arg).forEach(key => {
			let info = arg[key]
		})
	}
}

class ConfirmPrompt {
	constructor(args) {
		this.something = null
	}
}

function getClass(arg) {
	let return_arr = []
	 Array.from(document.getElementsByClassName(arg)).forEach(elem => {
	 	return_arr.push(new Elem(elem))
	 })
	return return_arr
}

function InputLink(elem) {

}

// CONSTANTS //

const print = console.log
const body = new Elem(document.body)

// UTILITIES //

const repeat = (n, func) => {
	for (var i = 0; i < n; i++) {
		func(i)
	}
}

const wait = (ms) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res()
		}, ms)
	})
}

function randi(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

/// ARRAYS ///

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length + 1;
        while (k--) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
}

Array.prototype.random = function () {
	if (this.length == 0) {
		return null
	} else {
		return this[randi(0, this.length-1)]
	}
}

Array.prototype.remove = function (ind) {
	return this.splice(ind, 1)[0]
}