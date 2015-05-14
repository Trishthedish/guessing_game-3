(function() {
  //Constructs a historical event, with eventName and eventDate properties. Contains methods that
  //set values to parameters if !undefined, else sets to parameters.
  function HistoricalEvent(eventName,dateArray) {

    this.getEventYear = function () {
      var eventYear;
      eventYear =  "";
      while (eventYear.length != 4 || isNaN(eventYear)) {
        eventYear = prompt("What year did " + this.eventName + " happen?");
      }
      return eventYear;
    };

    // Prompts the player to enter a month, checks it is correctly formatted and a possible month.
    this.getEventMonth = function () {
      var eventMonth;
      eventMonth = "";
      while (eventMonth.length < 1 || eventMonth.length > 2 || isNaN(eventMonth) || eventMonth > 11) {
        eventMonth = (prompt("In what number month did " + this.eventName + " happen?") - 1);
      }
      return eventMonth;
    };

    //Prompts the player to enter a date, checks it is correctly formatted and a possible date.
    this.getEventDate = function () {
      var eventDate;
      eventDate = "";
      while (eventDate.length < 1 || eventDate.length > 2 || isNaN(eventDate) || eventDate > 31) {
        eventDate = prompt("What day of the month did " + this.eventName + " happen?");
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
      if (eventName != undefined) {
        this.eventName = eventName;
      } else {
        this.eventName = prompt("The blackboard stretches out blank before you. You stand there, chalk in hand. What event will you be teaching your class about today?");
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
      this.timeLeftInClass = 45;
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
  }

  //Takes Student() object and HistoricalEvent() objects as input, returns the number of planet
  //years since the event rounded to 3 decimal places
  var getPlanetYears = function (student,historicalEvent) {
    var daysSince, yearsFloat;
    daysSince = Math.floor((Date.parse(historicalEvent.currentDate) - Date.parse(historicalEvent.fullEventDate)) / 86400000);
    console.log(daysSince);
    yearsFloat = daysSince / student.yearLength;
    return yearsFloat.toFixed(3);
  }



  /*

  //Handles user guesses, checking if close, .
  var userGuess = function(user) {
    var guess, guessArray;
    // Asks the user to guess how many full moons there have been since their chosen date. If they are off by more than 10 full moons, they are prompted to guess again.
    guess = prompt("Ok, take a guess: about how many full moons have there been since " + user.fullUserDate.toDateString() + "?");
    guessArray = [];
    while (guess > user.fullMoons + 10 || guess < user.fullMoons - 10) {
      if (guess.length == 0) {
        guess = prompt("Please pick a number. How many full moons have there been?");
      } else if (guess > user.fullMoons + 5) {
        guessArray.push(guess);
        guess = prompt(guess + " is too high, try again.");
      } else if (guess < user.fullMoons - 5) {
        guessArray.push(guess);
        guess = prompt(guess + " is too low, try again.");
      }
    }
    // Notifies the user if they were close, or got the exact answer estimated.
    if (guess == user.fullMoons) {
      alert(user.fullMoons.toString() + " is exactly what we estimated! Way to go.");
    } else {
      alert("That's close enough. We estimated " + user.fullMoons.toString() + ". Way to go!");
    }
  };

  */



  var studentsArray = [
    ["Mercury","Mercurian",88.025,"pendulus, pebbly tail"],
    ["Venus","Venusian",224.7,"heavy, scaly trunk"],
    ["Mars","Martian",686.98,"delicate, dusky orange hand"],
    ["Jupiter","Jovian year",4329.63,"gaseous, indistinct arm-shaped-cloud"],
    ["Saturn","Saturnian",10751.805,"bulbous, bright purple breathing sack"],
    ["Uranus","Uranian",30667.3,"...well, I'm sure you can imagine"],
    ["Neptune","Neptunian",60146.89,"sharp, sea green pincer"],
    ["Earth","Earthican",365,"stubby, pink fingers"]
  ]

  newEvent = new HistoricalEvent("My Birthday",[1990,0,1]);
  newEvent.init();
  console.log(newEvent.currentDate);
  newPlayer = new Player();
  newStudent = new Student(studentsArray[0]);
  console.log(getPlanetYears(newStudent,newEvent));

})();
