var $question = $('#question');
var $answers = $('#answers');
var $back = $('#back');
var $caption = $('#caption');
var $permit = $('#permit');

var current;
var checklist = [];
var actions = [];

function renderPermit() {
  // Reset
  $question.html('');
  $caption.html('');
  $answers.html('');
  $back.html('');


  $.get('/permits/' + current.permitId)
    .then(function(permit) {
      var markup = '<div class="inner-container"><h3>' + permit.title + '</h3>';
      markup += '<p>' + permit.description + '</p>';
      markup += '<h3>Take care of the below items before submitting application:</h3>';
      markup += checklist.map(function(prereq) {
        return '<p><label><input type="checkbox"></input>' + prereq +'<label></p>';
      }).join('');
      markup += '<h3>Next steps:</h3>';
      markup += '<p><a target="_blank" href="' + permit.pdf + '"><button class="button full-width">Download your Express Application</button></a></p></div>';
	  markup += '<br><h5>Email or Visit the permit center in person</h5>';
	  markup += '<p><a target="_blank" href="mailto:pdrdexpresspermits@austintexas.gov"><button class="button width-40">Email your application</button></a> or <a target="_blank" href="http://i.imgur.com/in5fkg1.png"><button class="button width-40">Visit the Permit Center</button></a></p></div>';
	  markup += '<br><h5>After receiving a confirmation email (which may take 3-5 business days), you may pay for your permit online (instructions will be in confirmation email).</h5></div>';
	  $permit.html(markup);
    });
}

function renderAnswer(text) {
  var $answer = $('<button class="wizard-button">' + text + ' </button>');
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

  // Caption
  if (current.caption)
    $caption.html(current.caption);
  else
    $caption.html('');

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
  $question.html('<h3>We\'re sorry, this type of permit is not available yet.<br/>Please call 512-978-4000 or visit <a href="http://www.austintexas.gov/department/development-services">Development Services</a></h3>');
  $answers.html('');
  $caption.html('');
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
