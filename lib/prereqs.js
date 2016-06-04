module.exports = {
  '1': {
      'text': 'Are you in a historic district?',
      'link': 'http://www.austintexas.gov/GIS/developmentwebmap/Viewer.aspx',
      'answers': [{'yes': 'https://historic.permit.pdf'}, {'no': null}]
  },
  '2': {
      'text': 'Are you in an airport overlay zone?',
      'link': 'http://www.austintexas.gov/GIS/developmentwebmap/Viewer.aspx',
      'answers': [{'yes': 'https://aviation.overlay.pdf'}, {'no': null}]
  },
  '3': {
      'text': 'Are you within 150 feet of a floodplain?',
      'link': 'http://atxfloodpro.com',
      'answers': [{'yes': 'http://fema.elevation.certificate.pdf'}, {'no': null}]
  },
  '4': {
      'text': 'Do you have expired permits?',
      'link': 'https://www.austintexas.gov/devreview/a_queryfolder_permits.jsp',
      'answers': [{'yes': 'http://deal.with.permits.pdf'}, {'no': null}]
  }

};
