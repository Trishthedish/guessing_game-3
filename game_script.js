window.onload = function() {
  var letter, alienProfessor, textbook, textbookList, player;

  //Constructs a Player() object, which stores the name, correct and incorrect answers, and class
  //time remaining.
  function Player(name) {
    this.name = name;
    this.incorrectAnswers = 0;
    this.timeLeftInClass = 45;
    this.correctAnswers = 0;
  }

  letter = document.getElementById("letter");
  alienProfessor = document.getElementById("alien_professor");
  textbook = document.getElementById("textbook");
  textbookList = document.getElementById("textbook_list");


  var setTextbook = function(historicalEvents) {
    var liNode, chapterTitle, ulNode, ulChild, eventDate;

    for (var i = 0; i < historicalEvents.length; i ++) {
      liNode = document.createElement("li");
      chapterTitle = document.createTextNode(historicalEvents[i][0].toUpperCase());
      liNode.appendChild(chapterTitle);
      ulNode = document.createElement("ul");
      ulChild = document.createElement("li");
      eventDate = document.createTextNode(historicalEvents[i][1])
      ulChild.appendChild(eventDate);
      ulNode.appendChild(ulChild)
      liNode.appendChild(ulNode)
      liNode.setAttribute("id", i)
      textbookList.insertBefore(liNode,textbookList.firstChild);
    }

  }

  //Hides #alien_professor, #textbook.
  alienProfessor.style.display = "none";
  textbook.style.display = "none";

  //On "Accept Position" button press, hides #letter, and shows #alien_professor.
  document.getElementById("accept_position").onclick = function() {
      letter.style.display = "none";
      alienProfessor.style.display = "unset";
  }

  //On "Nice to meet you" button press, checks for name, and generates Player() object, hides
  //#alien_professor, and shows #textbook.
  document.getElementById("name_button").onclick = function() {
    if (document.getElementById("name_input").value.length > 0) {
      player = new Player(document.getElementById("name_input").value);
      alienProfessor.style.display = "none";
      textbook.style.display = "unset";
    }
  }

  var historicalEvents = [
    ["the start of World War II",[1939,8,1]],
    ["the fall of Constantinople",[1453,3,29]]
  ];

setTextbook(historicalEvents);

}
