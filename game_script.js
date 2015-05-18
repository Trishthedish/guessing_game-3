window.onload = function() {
  var letter, alienProfessor, professorQuestion, professorGreeting, textbook, customEventButton, placeholderDate, customEventForm, textbookList, dateGuidance, player, historicalEvent, classroom, footer, satisfiedStudentsCounter, dissatisfiedStudentsCounter, mercurian, venusian, martian, jovian, saturnian, uranian, neptunian, raisedHands, classTimer, blackboardText, gameplayNarration, student, playerAnswer, studentSpeech, answerButton, answerInput;

  //Constructs a Player() object, which stores the name, correct and incorrect answers, and class
  //time remaining.
  function Player(name) {
    this.name = name;
    this.classTime = 45;
    this.satisfiedStudents = 0;
    this.dissatisfiedStudents = 0;
  }

  //Creates a HistoricalEvent() object, which stores information about the chosen historical event.
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

  }

  //Constructs a Student() object, using an array [planet,demonym,yearLength,bodyPart] to set properties.
  //Students only have a certain patience level, which is also tracked.
  function Student(studentArray) {
    this.planet = studentArray[0];
    this.demonym = studentArray[1];
    this.yearLength = studentArray[2];
    this.bodyPart = studentArray[3];
    this.patience = 12;
  }
  //Takes studentYearLength as number and HistoricalEvent() objects as input, returns the
  //number of planet years since the event rounded to 3 decimal places
  var getPlanetYears = function (studentYearLength,historicalEvent) {
    var daysSince, yearsFloat;
    daysSince = Math.floor((Date.parse(historicalEvent.currentDate) - Date.parse(historicalEvent.fullEventDate)) / 86400000);
    yearsFloat = daysSince / studentYearLength;
    return yearsFloat;
  }

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
        classroom.style.display = "";
        footer.style.display = "";
        raisedHands = raiseHands(students,historicalEvent);
        setTheBoard();
        blackboardText.textContent = historicalEvent.name.toUpperCase() + " (" + historicalEvent.fullEventDate.toDateString().substring(4) + ")";
        chooseStudent();
      }
    }

  }

  //Takes students array, and selected HistoricalEvent() object, and returns a raisedHands array
  //of students whose planets have had at least 1 year since the event.
  var raiseHands = function(students,historicalEvent) {
    var raisedHands;
    raisedHands = [];
    for (i in students) {
      if (getPlanetYears(students[i][2],historicalEvent) >= 1) {
        raisedHands[i] = students[i];
      }
    }
    return raisedHands;
  }

  //Takes the raisedHands array, hides all students, and displays the students in raisedHands array.
  var displayStudents = function(raisedHands) {
    for (var i in students) {
      document.getElementById(i).style.display = "none";
    }
    for (var i in raisedHands) {
      var student = document.getElementById(i);
      student.style.display = "";
    }
  }

  var displayTeacherEval = function(player) {
    satisfiedStudentsCounter.textContent = player.satisfiedStudents;
    dissatisfiedStudentsCounter.textContent = player.dissatisfiedStudents;
  }

  var setTheBoard = function() {
    displayStudents(raisedHands);
    displayTeacherEval(player);
    classTimer.setAttribute("value",player.classTime);
    if (document.getElementById("patience_bar") != undefined) {
      document.getElementById("patience_bar").setAttribute("value",student.patience)
    }
  }

  var chooseStudent = function() {
    gameplayNarration.textContent = "A number of students raise their various alien appendages. Who will you call on?"
    studentSpeech.textContent = "";
    playerAnswer.style.display = "none";
    for (var i in raisedHands) {
      var studentFig = document.getElementById(i);
      studentFig.style.cursor = "pointer";
      studentFig.onclick = function() {
        var patienceText, patienceBar;
        student = new Student(students[this.id]);
        patienceText = document.createTextNode("Patience: ")
        patienceBar = document.createElement("progress")
        patienceBar.setAttribute("max","12");
        patienceBar.id = "patience_bar";
        this.appendChild(patienceText);
        this.appendChild(patienceBar);
        askTheQuestion();
        setTheBoard();
      }
    }
  }

  var askTheQuestion = function() {
    var studentFig, planetYears, answer, fuzziness;
    for (var i in students) {
      studentFig = document.getElementById(i);
      studentFig.style.cursor = "auto";
      studentFig.onclick = undefined;
    }
    gameplayNarration.textContent  = "The " + student.demonym + " student looks inquisitively up at you—or at least you think it does."
    studentSpeech.textContent = "\"Professor " + player.name + ", Earth years are still confusing to me. About how many " + student.demonym + " years ago was " + historicalEvent.name + "?\""
    playerAnswer.style.display = "";

    planetYears = getPlanetYears(student.yearLength,historicalEvent);
    console.log(planetYears);
    answerButton.onclick = function() {
      //fuzziness is the range allowed to be accepted as a correct answer, to be adjusted later with an algorithm.
      fuzziness = 1;
      if (player.classTime > 0 && student.patience > 0)  {
        console.log(player.classTime);
        console.log(student.patience);
        answer = answerInput.value;
        player.classTime -= 1;
        if (answer > planetYears + fuzziness) {
          student.patience -= 1;
          gameplayNarration.textContent  = "The " + student.demonym + " shakes what might be its head.";
          studentSpeech.textContent = "\"I don't know, Professor " + player.name + ", " + answer + " sounds like too many years. How many was it really?\"";
          setTheBoard();
        }
        else if (answer < planetYears - fuzziness) {
          student.patience -= 1;
          gameplayNarration.textContent  = "The " + student.demonym + " shakes what might be its head.";
          studentSpeech.textContent = "\"I don't know, Professor " + player.name + ", " + answer + " doesn't sound like enough years. How many was it really?\"";
          setTheBoard();
        } else {
          gameplayNarration.textContent  = "The " + student.demonym + " student appears to nod.";
          studentSpeech.textContent = "\"That makes sense, Professor " + player.name + ". Thanks!\"";
          player.satisfiedStudents += 1;
          delete raisedHands[student.demonym.toLowerCase()];
          console.table(raisedHands);
          setTheBoard();
        }
      }
      //Checks if answer was close enough, if time ran out, or if patience ran out.
      // if (player.classTime == 0) {
      //   alert("There's the bell! Your students begin to gather up their strange belongings with their odd assortments of limbs.");
      // }
      // else if (student.patience == 0) {
      //   alert("The " + student.demonym + " student has had enough. \"Professor " + player.name + ", if you can't answer my questions then I'm just gonna leave.\" It grabs its notebooks with its " + student.bodyPart + ", and moves strangely from the room.")
      // }
      // else {
      //   player.correctAnswers += 1;
      //   alert("The " + student.demonym + " student appears to nod. \"That makes sense, Professor " + player.name + ". Thanks!\"");
      // }


    }

  }

  //Takes a Student() object, and returns a string based on how low their patience level
  //is
  var howAnnoyed = function(student) {
    if (student.patience > 8) {
      return "but the student still seems patient."
    } else if (student.patience > 4) {
      return "and the student seems to be getting annoyed."
    } else if (student.patience > 0) {
      return "and the student seems to be very annoyed."
    } else {
      return "and the student seems almost ready to walk out."
    }
  }

  //Gets all the elements that will be used below.
  letter = document.getElementById("letter");
  alienProfessor = document.getElementById("alien_professor");
  professorGreeting = document.getElementById("professor_greeting");
  professorQuestion = document.getElementById("professor_question");
  customEventButton = document.getElementById("custom_event_button");
  placeholderDate = document.getElementById("placeholder_date");
  customEventForm = document.getElementById("custom_event_form");
  textbook = document.getElementById("textbook");
  textbookList = document.getElementById("textbook_list");
  dateGuidance = document.getElementById("date_guidance");
  classroom = document.getElementById("classroom");
  footer = document.getElementsByTagName("footer")[0];
  satisfiedStudentsCounter = document.getElementById("satisfied_students");
  dissatisfiedStudentsCounter = document.getElementById("dissatisfied_students");
  mercurian = document.getElementById("mercurian");
  venusian = document.getElementById("venusian");
  martian = document.getElementById("martian");
  jovian = document.getElementById("jovian");
  saturnian = document.getElementById("saturnian");
  uranian = document.getElementById("uranian");
  neptunian = document.getElementById("neptunian");
  classTimer = document.getElementById("class_time");
  blackboardText = document.getElementById("blackboard_text");
  gameplayNarration = document.getElementById("gameplay_narration");
  playerAnswer = document.getElementById("player_answer");
  studentSpeech = document.getElementById("student_speech");
  answerButton = document.getElementById("answer_button");
  answerInput = document.getElementById("answer_input");

  //Hides sections of the HTML doc, so they can be shown later.
  alienProfessor.style.display = "none";
  professorGreeting.style.display = "none";
  customEventForm.style.display = "none";
  textbook.style.display = "none";
  classroom.style.display = "none";
  footer.style.display = "none";
  mercurian.style.display = "none";
  venusian.style.display = "none";
  martian.style.display = "none";
  jovian.style.display = "none";
  saturnian.style.display = "none";
  uranian.style.display = "none";
  neptunian.style.display = "none";
  playerAnswer.style.display = "none";

  //On "Accept Position" button press, hides #letter, and shows #alien_professor.
  document.getElementById("accept_position").onclick = function() {
      letter.style.display = "none";
      alienProfessor.style.display = "";
      document.getElementById("name_input").setAttribute("autofocus","true");
  }

  //On "Nice to meet you" button press, checks for name, and generates Player() object, hides
  //#alien_professor, and shows #textbook.
  document.getElementById("name_button").onclick = function() {
    if (document.getElementById("name_input").value.length > 0) {
      player = new Player(document.getElementById("name_input").value);
      setName(player);
      professorQuestion.style.display = "none";
      professorGreeting.style.display = "";
    }
  }

  document.getElementById("enter_classroom").onclick = function() {
    professorGreeting.style.display = "none";
    textbook.style.display = "";
  }

  customEventButton.onclick = function() {
    customEventButton.style.display = "none";
    placeholderDate.style.display = "none";
    customEventForm.style.display = "";
    document.getElementById("event_name").setAttribute("autofocus","true");
  }

  document.getElementById("set_custom_date").onclick = function() {
    if (document.getElementById("event_name").value.length > 0 && document.getElementById("event_year").value.length == 4 && !isNaN(document.getElementById("event_year").value) && document.getElementById("event_month").value.length > 0 && document.getElementById("event_month").value.length <= 2 && document.getElementById("event_month").value <= 12 && !isNaN(document.getElementById("event_month").value) && document.getElementById("event_date").value.length > 0 && document.getElementById("event_date").value.length <= 2 && document.getElementById("event_date").value <= 31 && !isNaN(document.getElementById("event_date").value)) {
      historicalEvent = new HistoricalEvent([document.getElementById("event_name").value, document.getElementById("event_year").value, document.getElementById("event_month").value - 1, document.getElementById("event_date").value])
      console.log(historicalEvent.fullEventDate.toDateString());
      if (historicalEvent.checkDateValid()) {
        textbook.style.display = "none";
        classroom.style.display = "";
        footer.style.display = "";
        raisedHands = raiseHands(students,historicalEvent);
        setTheBoard();

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

  var students = {
    "mercurian": ["Mercury","Mercurian",88.025,"pendulus, pebbly tail"],
    "venusian": ["Venus","Venusian",224.7,"heavy, scaly trunk"],
    "martian": ["Mars","Martian",686.98,"delicate, dusky orange hand"],
    "jovian": ["Jupiter","Jovian",4329.63,"gaseous, indistinct arm-shaped-cloud"],
    "saturnian": ["Saturn","Saturnian",10751.805,"bulbous, bright purple breathing sack"],
    "uranian": ["Uranus","Uranian",30667.3,"...well, I'm sure you can imagine"],
    "neptunian": ["Neptune","Neptunian",60146.89,"sharp, sea green pincer"]
  };

setTextbook(historicalEvents);


}
