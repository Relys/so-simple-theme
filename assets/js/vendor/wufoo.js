function initForm() {
	initializeFocus();
	var e = document.getElementsByTagName("form1")[0];
	addEvent(e, "submit", disableSubmitButton);
	ifInstructs();
	showRangeCounters()
}
function disableSubmitButton() {
	document.getElementById("saveForm").disabled = true
}
function initializeFocus() {
	var e = getElementsByClassName(document, "*", "field");
	for (i = 0; i < e.length; i++) {
		if (e[i].type == "radio" || e[i].type == "checkbox") {
			e[i].onclick = function () {
				highlight(this, 4)
			};
			e[i].onfocus = function () {
				highlight(this, 4)
			}
		} else if (e[i].className.match("addr") || e[i].className.match("other")) {
			e[i].onfocus = function () {
				highlight(this, 3)
			}
		} else {
			e[i].onfocus = function () {
				highlight(this, 2)
			}
		}
	}
}
function highlight(e, t) {
	if (t == 2) {
		var n = e.parentNode.parentNode
	}
	if (t == 3) {
		var n = e.parentNode.parentNode.parentNode
	}
	if (t == 4) {
		var n = e.parentNode.parentNode.parentNode.parentNode
	}
	addClassName(n, "focused", true);
	var r = getElementsByClassName(document, "*", "focused");
	for (i = 0; i < r.length; i++) {
		if (r[i] != n) {
			removeClassName(r[i], "focused")
		}
	}
}
function ifInstructs() {
	var e = document.getElementById("public");
	if (e) {
		removeClassName(e, "noI");
		var t = getElementsByClassName(document, "*", "instruct");
		if (t == "") {
			addClassName(e, "noI", true)
		}
		if (e.offsetWidth <= 450) {
			addClassName(e, "altInstruct", true)
		}
	}
}
function showRangeCounters() {
	counters = getElementsByClassName(document, "em", "currently");
	for (i = 0; i < counters.length; i++) {
		counters[i].style.display = "inline"
	}
}
function validateRange(e, t) {
	if (document.getElementById("rangeUsedMsg" + e)) {
		var n = document.getElementById("Field" + e);
		var r = document.getElementById("rangeUsedMsg" + e);
		switch (t) {
		case "character":
			r.innerHTML = n.value.length;
			break;
		case "word":
			var s = n.value;
			s = s.replace(/\n/g, " ");
			var o = s.split(" ");
			var u = 0;
			for (i = 0; i < o.length; i++) {
				if (o[i].replace(/\s+$/, "") != "")
					u++
			}
			r.innerHTML = u;
			break;
		case "digit":
			r.innerHTML = n.value.length;
			break
		}
	}
}
function getElementsByClassName(e, t, n) {
	var r = t == "*" && e.all ? e.all : e.getElementsByTagName(t);
	var i = new Array;
	n = n.replace(/\-/g, "\\-");
	var s = new RegExp("(^|\\s)" + n + "(\\s|$)");
	var o;
	for (var u = 0; u < r.length; u++) {
		o = r[u];
		if (s.test(o.className)) {
			i.push(o)
		}
	}
	return i
}
function addClassName(e, t, n) {
	if (e.className) {
		var r = e.className.split(" ");
		if (n) {
			var i = t.toUpperCase();
			for (var s = 0; s < r.length; s++) {
				if (r[s].toUpperCase() == i) {
					r.splice(s, 1);
					s--
				}
			}
		}
		r[r.length] = t;
		e.className = r.join(" ")
	} else {
		e.className = t
	}
}
function removeClassName(e, t) {
	if (e.className) {
		var n = e.className.split(" ");
		var r = t.toUpperCase();
		for (var i = 0; i < n.length; i++) {
			if (n[i].toUpperCase() == r) {
				n.splice(i, 1);
				i--
			}
		}
		e.className = n.join(" ")
	}
}
function addEvent(e, t, n) {
	if (e.attachEvent) {
		e["e" + t + n] = n;
		e[t + n] = function () {
			e["e" + t + n](window.event)
		};
		e.attachEvent("on" + t, e[t + n])
	} else {
		e.addEventListener(t, n, false)
	}
}
addEvent(window, "load", initForm);
var highlight_array = new Array