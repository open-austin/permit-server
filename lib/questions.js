module.exports = {
  '1': {
    text: 'What kind of construction permit do you need to submit?',
    answers: {
      'Commercial': 2,
      'Residential': 3
    }
  },
  '2': {
    text: "Please return to the site.  Express Permit is unavailable for your situation."
  },
  
  '3': {
    text: 'Is it one of the following projects<ul><li>Replacing windows and/or exterior doors of the same size and same location</li><li>Adding/Removing siding or brick</li><li>Repairing a roof to the extent of replacing decking boards/fascia</li><li>Repairing foundation without increasing impervious cover</li><li>Roof mounted solar panels</li><li>Remove/Repair drywall in excess of 32 sq. ft.</li><li>Adding/Replacing insulation</li><li>Tub/Shower Conversions</li></ul>',
    answers: {
        'yes': 4,
        'no' : 2
    }
  },
  
'4': {
    text: "Will this project involve any structural members or increase square footage of structure?",
    answers: {
        'yes' : 2,
        'no' : 5
    }
        
}

};