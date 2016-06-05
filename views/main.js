var $question = $('#question');
var $answers = $('#answers');
var $back = $('#back');

var current;
var checklist = [];
var actions = [];

function renderAnswer(text) {
  var $answer = $('<button>' + text + '</button>');
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

  // Question
  $question.html(current.text);

  // Answers
  var answers = Object.keys(current.answers).map(renderAnswer);
  if (answers.length)
    $answers.html(answers);
  else
    $answers.html('');

  // Back Button
  if (actions.length) {
    var $backBtn = $('<button>Back</button>');
    $backBtn.click(function() {
      var previous = actions.pop();

      var checklistIdx = checklist.indexOf(previous.checklist);
      if (checklistIdx >= 0) {
        checklist.splice(checklistIdx, 1);
      }

      render(actions.pop());
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
