var $question = $('#question');
var $answers = $('#answers');
var current;
var checklist = [];
var actions = [];

function renderAnswer(text) {
  var $answer = $('<button>' + text + '</button>');
  $answer.click(function() {
    var id = current.answers[text];
    current.selected = text;
    actions.push(current);
    getQuestion(id);
  });
  return $answer;
}

function render(data) {
  current = data;
  $question.html(current.text);
  var answers = Object.keys(current.answers).map(renderAnswer);
  if (answers.length)
    $answers.html(answers);
  else
    $answers.html('');

  // if (actions.length) {
  //   $backBtn = $('<button>Back</button>');
  //   $back.html($backBtn);
  // } else {
  //   $back.html('');
  // }
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
