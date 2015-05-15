(function() {
  //Constructs a historical event, with name and eventDate properties. Contains methods that
  //set values to parameters if !undefined, else sets to parameters.
  function HistoricalEvent(name,dateArray) {

    this.getEventYear = function () {
      var eventYear;
      eventYear =  "";
      while (eventYear.length != 4 || isNaN(eventYear)) {
        eventYear = prompt("What year did " + this.name + " happen?");
      }
      return eventYear;
    };

    // Prompts the player to enter a month, checks it is correctly formatted and a possible month.
    this.getEventMonth = function () {
      var eventMonth;
      eventMonth = "";
      while (eventMonth.length < 1 || eventMonth.length > 2 || isNaN(eventMonth) || eventMonth > 11) {
        eventMonth = (prompt("In what number month did " + this.name + " happen?") - 1);
      }
      return eventMonth;
    };

    //Prompts the player to enter a date, checks it is correctly formatted and a possible date.
    this.getEventDate = function () {
      var eventDate;
      eventDate = "";
      while (eventDate.length < 1 || eventDate.length > 2 || isNaN(eventDate) || eventDate > 31) {
        eventDate = prompt("What day of the month did " + this.name + " happen?");
      }
      return eventDate;
    };

    //Compares fullEventDate with currentDate, returns true if fullEventDate is in the past,
    //false if it is either the current date or the future.
    this.checkDateValid = function () {
      if ((Date.parse(this.currentDate) - Date.parse(this.fullEventDate)) < 0) {
        return false;
      } else {
        return true;
      }
    };

    //Prompts the player to select a date, and checks to ensure that the date is in the past.
    //Declares a currentDate Date() object after fullEventDate to ensure checkDateValid runs properly.
    this.setFullEventDate = function() {
      this.fullEventDate = new Date();
      this.currentDate = new Date();
      this.currentDate.setFullYear(this.currentDate.getFullYear() + 200);
      //Keeps asking for a year until the player selects a year in the past.
      do {
        this.fullEventDate.setFullYear(this.getEventYear());
        if (!this.checkDateValid()) {
          alert("You’re teaching a history class, not a futurology class—that’s Prof. Glaxbørk’s department. Choose a year in the past.");
        }
      } while (!this.checkDateValid());
      //Keeps asking for a month until the player selects a month in the past.
      do {
        this.fullEventDate.setMonth(this.getEventMonth());
        if (!this.checkDateValid()) {
          alert("You’re teaching a history class, not a futurology class—that’s Prof. Glaxbørk’s department. Choose a month in the past.");
        }
      } while (!this.checkDateValid());
      //Keeps asking for a date until the player selects a date in the past.
      do {
        this.fullEventDate.setDate(this.getEventDate());
        if (!this.checkDateValid()) {
          alert("You’re teaching a history class, not a futurology class—that’s Prof. Glaxbørk’s department. Choose a date in the past.");
        }
      } while (!this.checkDateValid());
    };

    //Constructs a Date() object from a passed array [year,month,date], to be used with
    //preloaded historical events. Returns the Date() object.
    this.useDateArray = function(dateArray) {
      var date = new Date();
      date.setFullYear(dateArray[0]);
      date.setMonth(dateArray[1]);
      date.setDate(dateArray[2]);
      return date;
    }

    //Initializes the newEvent, using arguments to define parameters if available, otherwise
    //prompting the user to provide them. Sets currentDate if using provided date.
    this.init = function () {
      if (name != undefined) {
        this.name = name;
      } else {
        this.name = prompt("The blackboard stretches out blank before you. You stand there, chalk in hand. What event will you be teaching your class about today?");
      }
      if (dateArray != undefined) {
        this.fullEventDate = this.useDateArray(dateArray);
        this.currentDate = new Date();
        this.currentDate.setFullYear(this.currentDate.getFullYear());
      } else {
        this.setFullEventDate();
      }
    };

  }


  //Constructs a Player() object, which stores the name, correct and incorrect answers, and class
  //time remaining.
  function Player() {
    this.init = function () {
      this.name = prompt("Outside your classroom, one of your new colleagues stretches out its tentacly arm to shake your pink, squishy one. \"Hi, I'm Professor ßåxtëµ. Welcome to the faculty! What was your name again?\"");
      this.incorrectAnswers = 0;
      this.timeLeftInClass = 60;
      this.correctAnswers = 0;
    }
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

  //Takes Student() object and HistoricalEvent() objects as input, returns the number of planet
  //years since the event rounded to 3 decimal places
  var getPlanetYears = function (student,historicalEvent) {
    var daysSince, yearsFloat;
    daysSince = Math.floor((Date.parse(historicalEvent.currentDate) - Date.parse(historicalEvent.fullEventDate)) / 86400000);
    yearsFloat = daysSince / student.yearLength;
    return yearsFloat;
  }

  //Handles the student question event in the game. It takes HistoricalEvent(), Player(), and Student() objects,
  //incrementing correctAnswers and incorrectAnswers stored in the Player() object.
  var answerTheQuestion = function (historicalEvent,player,student) {
    var planetYears, answer, fuzziness;
    //fuzziness is the range allowed to be accepted as a correct answer, to be adjusted later with an algorithm.
    fuzziness = 1;
    planetYears = getPlanetYears(student,historicalEvent);
    console.log(planetYears);
    answer = prompt("With " + player.timeLeftInClass + " seconds left in class, a " + student.demonym + " student raises its " + student.bodyPart + ". \"Wait, Professor " + player.name + ", about how many " + student.demonym + " years ago was " + historicalEvent.name + "?\"");
    //Loops runs while player's guess is not close enough, and there is still both class time and student patience.
    while ((answer > planetYears + fuzziness || answer < planetYears - fuzziness) && player.timeLeftInClass > 0 && !isNaN(answer))  {
      if (answer.length == 0) {
        player.timeLeftInClass -= 5;
        player.incorrectAnswers += 1;
        student.patience -= 1;
        answer = prompt("The " + student.demonym + " student looks inquisitively up at you—or at least you think it does. There are only " + player.timeLeftInClass + " seconds left in class.");
      } else if (answer > planetYears + fuzziness) {
        player.timeLeftInClass -= 5;
        player.incorrectAnswers += 1;
        student.patience -= 1;
        answer = prompt("The " + student.demonym + " shakes what might be its head. \"I don't know, Professor " + player.name + ", " + answer + " sounds like too many years. How many was it really?\" There are only " + player.timeLeftInClass + " seconds left in class, and the student seems to be getting annoyed.");
      } else if (answer < planetYears - fuzziness) {
        player.timeLeftInClass -= 5;
        player.incorrectAnswers += 1;
        student.patience -= 1;
        answer = prompt("The " + student.demonym + " shakes what might be its head. \"I don't know, Professor " + player.name + ", " + answer + " doesn't sound like enough years. How many was it really?\" There are only " + player.timeLeftInClass + " seconds left in class, and the student seems to be getting annoyed.");
      }
    }
    //Checks if answer was close enough, if time ran out, or if patience ran out.
    if (player.timeLeftInClass == 0) {
      alert("There's the bell! Your students begin to gather up their strange belongings with their odd assortments of limbs.");
    } else if (student.patience == 0) {
      alert("The " + student.demonym + " student has had enough. \"Professor " + player.name + ", if you can't answer my questions then I'm just gonna leave.\" It grabs its notebooks with its " + student.bodyPart + " and moves oddly from the room.")
    } else {
      player.correctAnswers += 1;
      alert("The " + student.demonym + " student appears to nod. \"That makes sense, Professor " + player.name + ". Thanks!");
    }
  }

  var studentsArray = [
    ["Mercury","Mercurian",88.025,"pendulus, pebbly tail"],
    ["Venus","Venusian",224.7,"heavy, scaly trunk"],
    ["Mars","Martian",686.98,"delicate, dusky orange hand"],
    ["Jupiter","Jovian year",4329.63,"gaseous, indistinct arm-shaped-cloud"],
    ["Saturn","Saturnian",10751.805,"bulbous, bright purple breathing sack"],
    ["Uranus","Uranian",30667.3,"...well, I'm sure you can imagine"],
    ["Neptune","Neptunian",60146.89,"sharp, sea green pincer"]
  ]

  alert("Ten years ago, NASA secretly established communications with the intelligent alien lifeforms that had been hiding out in our solar system for years. After a decade of sending Earth’s best academic journals—via radio wave—into space, Solar System University’s board of trustees has allowed a satellite campus to be opened on earth. SSU Earth is opening its shiny metal doors today, and you’ve been selected as its first Professor of Terrestrial History.");
  newEvent = new HistoricalEvent("World War 2",[1939,8,1]);
  newEvent.init();
  newPlayer = new Player();
  newPlayer.init();
  newStudent = new Student(studentsArray[1]);
  answerTheQuestion(newEvent,newPlayer,newStudent)
})();
