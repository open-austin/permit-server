var $question = $('#question');
var $answers = $('#answers');
var $back = $('#back');
var $permit = $('#permit');

var current;
var checklist = [];
var actions = [];

function renderPermit() {
  // Reset
  $question.html('');
  $answers.html('');
  $back.html('');

  $.get('/permits/' + current.permitId)
    .then(function(permit) {
      console.log(permit);
      var markup = '<h3>' + permit.title + '</h3>';
      markup += '<p>' + permit.description + '</p>';
      markup += '<h3>Take care of the below items before submitting application:</h3>';
      markup += checklist.map(function(prereq) {
        return '<p><input type="checkbox"></input><label>' + prereq +'</p>';
      }).join('');
      markup += '<h3>Next steps:</h3>';
      markup += '<p><a target="_blank" href="' + permit.pdf + '"><button>Download your Express Application</button></a></p>';


      $permit.html(markup);
    });
}

function renderAnswer(text) {
  var $answer = $('<button class="wizard-button">' + text + '</button>');
  $answer.click(function() {
    var id = current.answers[text].next;
    current.selected = text;
    actions.push(current);

    if (current.answers[text].checklist) {
      checklist.push(current.answers[text].checklist);
    }

    getQuestion(id);
  });
  return $answer;
}

function render(data) {
  // Set current data
  current = data;

  // TODO Check if there is a permid id to lookup
  if (current.permitId) {
    renderPermit();
    return;
  }

  // Question
  $question.html('<h3>' + current.text + '</h3>');

  // Answers
  var answers = Object.keys(current.answers).map(renderAnswer);
  if (answers.length)
    $answers.html(answers);
  else
    $answers.html('');

  // Back Button
  if (actions.length) {
    var $backBtn = $('<button class="back-button">Back</button>');
    $backBtn.click(function() {
      var previous = actions.pop();

      var checklistIdx = checklist.indexOf(previous.checklist);
      if (checklistIdx >= 0) {
        checklist.splice(checklistIdx, 1);
      }

      render(previous);
    });
    $back.html($backBtn);
  } else {
    $back.html('');
  }
}

function renderFailure() {
  $question.html("We're sorry, this type of permit is not available yet. Please call xxx-xxx-xxxx or visit foo.com");
  $answers.html('');
}

function getQuestion(id) {
  $.get('/questions/' + id)
    .then(function(data) {
      render(data);
    })
    .fail(function() {
      renderFailure();
    });
}

function diagnose() {
  console.log('Actions', actions);
  console.log('Checklist', checklist);
}

getQuestion(1);
