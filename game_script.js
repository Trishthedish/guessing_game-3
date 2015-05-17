window.onload = function() {
  var letter, alienProfessor, professorQuestion, professorGreeting, textbook, customEventButton, customEventForm, textbookList, dateGuidance, player, historicalEvent, classroom, footer;

  //Constructs a Player() object, which stores the name, correct and incorrect answers, and class
  //time remaining.
  function Player(name) {
    this.name = name;
    this.timeLeftInClass = 45;
    this.satisfiedStudents = 0;
    this.dissatisfiedStudents = 0;
  }

  //Gets all the elements that will be used below.
  letter = document.getElementById("letter");
  alienProfessor = document.getElementById("alien_professor");
  professorGreeting = document.getElementById("professor_greeting");
  professorQuestion = document.getElementById("professor_question");
  customEventButton = document.getElementById("custom_event_button");
  customEventForm = document.getElementById("custom_event_form");
  textbook = document.getElementById("textbook");
  textbookList = document.getElementById("textbook_list");
  dateGuidance = document.getElementById("date_guidance");
  classroom = document.getElementById("classroom");
  footer = document.getElementsByTagName("footer")[0];


  //Attaches text nodes of the player's name to all spans with id "player_name" in the HTML doc.
  var setName = function(player) {
    var nameSpans, playerName, nameNode;
    nameSpans = document.getElementsByClassName("player_name");
    playerName = player.name;
    for (var i = 0; i < nameSpans.length; i ++) {
      nameNode = document.createTextNode(playerName);
      nameSpans[i].appendChild(nameNode);
    }
  }

  //Populates the textbook with the contents of the historicalEvents array. Turns all events into buttons, with ids that
  //match their array index.
  var setTextbook = function(historicalEvents) {
    var liNode, chapterTitle, ulNode, ulChild, eventDate;

    for (var i = 0; i < historicalEvents.length; i ++) {
      liNode = document.createElement("li");
      chapterTitleButton = "<button class=\"textbook_button\" id=\"" + i + "\">" + historicalEvents[i][0].toUpperCase() + "</button>";
      liNode.innerHTML = chapterTitleButton;
      ulNode = document.createElement("ul");
      ulChild = document.createElement("li");
      eventDate = document.createTextNode(historicalEvents[i][2] + " / " + historicalEvents[i][3] + " / " + historicalEvents[i][1])
      ulChild.appendChild(eventDate);
      ulNode.appendChild(ulChild)
      liNode.appendChild(ulNode)
      liNode.setAttribute("id", i)
      textbookList.insertBefore(liNode,textbookList.firstChild);
      document.getElementById(i).onclick = function() {
        historicalEvent = new HistoricalEvent(historicalEvents[this.id]);
        // dateGuidance.textContent = historicalEvent.name + historicalEvent.fullEventDate;
        textbook.style.display = "none";
        classroom.style.display = "unset";
        footer.style.display = "unset";
      }
    }

  }

  function HistoricalEvent(dateArray) {

    //Compares fullEventDate with currentDate, returns true if fullEventDate is in the past,
    //false if it is either the current date or the future.
    this.checkDateValid = function () {
      if ((Date.parse(this.currentDate) - Date.parse(this.fullEventDate)) < 0) {
        return false;
      }
      else {
        return true;
      }
    };

    this.fullEventDate = new Date();
    this.currentDate = new Date();
    this.name = dateArray[0];
    this.fullEventDate.setFullYear(dateArray[1]);
    this.fullEventDate.setMonth(dateArray[2]);
    this.fullEventDate.setDate(dateArray[3]);

    };



  //Hides sections of the HTML doc, so they can be shown later.
  alienProfessor.style.display = "none";
  professorGreeting.style.display = "none";
  customEventForm.style.display = "none";
  textbook.style.display = "none";
  classroom.style.display = "none";
  footer.style.display = "none";

  //On "Accept Position" button press, hides #letter, and shows #alien_professor.
  document.getElementById("accept_position").onclick = function() {
      letter.style.display = "none";
      alienProfessor.style.display = "unset";
      document.getElementById("name_input").setAttribute("autofocus","true");
  }

  //On "Nice to meet you" button press, checks for name, and generates Player() object, hides
  //#alien_professor, and shows #textbook.
  document.getElementById("name_button").onclick = function() {
    if (document.getElementById("name_input").value.length > 0) {
      player = new Player(document.getElementById("name_input").value);
      setName(player);
      professorQuestion.style.display = "none";
      professorGreeting.style.display = "unset";
    }
  }

  document.getElementById("enter_classroom").onclick = function() {
    professorGreeting.style.display = "none";
    textbook.style.display = "unset";
  }

  customEventButton.onclick = function() {
    customEventButton.style.display = "none";
    customEventForm.style.display = "unset";
    document.getElementById("event_name").setAttribute("autofocus","true");
  }


  document.getElementById("set_custom_date").onclick = function() {
    if (document.getElementById("event_name").value.length > 0 && document.getElementById("event_year").value.length == 4 && !isNaN(document.getElementById("event_year").value) && document.getElementById("event_month").value.length > 0 && document.getElementById("event_month").value.length <= 2 && document.getElementById("event_month").value <= 12 && !isNaN(document.getElementById("event_month").value) && document.getElementById("event_date").value.length > 0 && document.getElementById("event_date").value.length <= 2 && document.getElementById("event_date").value <= 31 && !isNaN(document.getElementById("event_date").value)) {
      historicalEvent = new HistoricalEvent([document.getElementById("event_name").value, document.getElementById("event_year").value, document.getElementById("event_month").value - 1, document.getElementById("event_date").value])
      console.log(historicalEvent.fullEventDate.toDateString());
      if (historicalEvent.checkDateValid()) {
        textbook.style.display = "none";
        classroom.style.display = "unset";
        footer.style.display = "unset";
      } else if (!historicalEvent.checkDateValid()) {
        dateGuidance.textContent = "You’re teaching a History class, not a Futurology class—that’s Prof. Glaxbørk’s department. Choose a date in the past.";
      }
    }
    else if (document.getElementById("event_name").value.length == 0) {
      dateGuidance.textContent = "What kind of Terrestrial History professor doesn't know the name of an historical event?"
    }
    else {
      dateGuidance.textContent = "What kind of Terrestrial History professor doesn't know the date of an historical event?"
    }
  }




  var historicalEvents = [
    ["the start of World War II",1939,8,1],
    ["the fall of Constantinople",1453,3,29]
  ];

setTextbook(historicalEvents);

}
