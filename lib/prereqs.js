module.exports = {
  '1': {
      'text': 'Are you in a historic district?',
      'link': 'http://www.austintexas.gov/GIS/developmentwebmap/Viewer.aspx',
      'sub-questions': false,
      'answers': [{'yes': 'Please schedule an appointment with the Historic District'}, {'no': null}]
  },
  '2': {
      'text': 'Are you in an airport overlay zone?',
      'link': 'http://www.austintexas.gov/GIS/developmentwebmap/Viewer.aspx',
      'sub-questions': false,
      'answers': [{'yes': 'Please schedule an appointment with the Aviation Department'}, {'no': null}]
  },
  '3': {
      'text': 'Are you within 150 feet of a floodplain?',
      'link': 'http://atxfloodpro.com',
      'sub-questions': false,
      'answers': [{'yes': 'Please bring a FEMA elevation certificate form with your application'}, {'no': null}]
  },
  '4': {
      'text': 'Do you have expired permits?',
      'link': 'https://www.austintexas.gov/devreview/a_queryfolder_permits.jsp',
      'sub-questions': true,
      'answers': [{'yes': 5}, {'no': null}]
  },
     '5': {
      'text': 'Does the expired permit work qualify for the express permit?',
      'link': 'https://www.austintexas.gov/devreview/a_queryfolder_permits.jsp',
      'sub-questions': false,
      'answers': [{'yes': 'Add the expired permit work to the current permit'}, {'no': 'Bring an Acknowledgement of Expired Permit form with your application'}]
  }

};
