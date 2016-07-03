module.exports = {
    '1': {
        text: 'What kind of construction permit do you need to submit?',
        answers: {
            'Commercial': { next: 2 },
            'Residential': { next: 3 }
        }
    },

    '3': {
        text: 'Is it one of the following projects?',
        caption: '<ul class="inner-container"><li>Replacing windows and/or exterior doors of the same size and same location</li><li>Adding/Removing siding or brick</li><li>Repairing a roof to the extent of replacing decking boards/fascia</li><li>Repairing foundation without increasing impervious cover</li><li>Roof mounted solar panels</li><li>Remove/Repair drywall in excess of 32 sq. ft.</li><li>Adding/Replacing insulation</li><li>Tub/Shower Conversions</li></ul>',
        answers: {
            'Yes': { next: 4 },
            'No': { next: 2 }
        }
    },

    '4': {
        text: "Will this project involve any <span class='tooltip'>structural members [?]</span> or increase square footage of structure?",
        tooltip: '<div class="tip-content">Support that is a consitiuent part of any structure or building, for example:\n\n\Beam - long thick piece of wood or metal or concrete, etc., used in construction\nBracing, brace - a structural member used to stiffen a framework\nPlate - structural member consisting of a horizontal beam that provides bearing and anchorage\nRiser - structural member consisting of the vertical part of a stair or step\nSill - structural member consisting of a continuous horizontal timber forming the lowest member of a framework or supporting structure\nStructure, construction - a thing constructed; a complex entity constructed of many parts; \nSupport - any device that bears the weight of another thing; \nTread - structural member consisting of the horizontal part of a stair or step\nUpright, vertical - a vertical structural member as a post or stake.</div>',
        answers: {
            'Yes': { next: 2 },
            'No': { next: 5 }
        },
    },
    '5': {
        permitFound:true,
        text: 'You`re almost done!  You have qualified for an express permit.',
        caption:'<div class="inner-container"><p>There are a few more steps to check for any necessary prerequisites.</p><h5>Check your property for <span class="tooltip">NRHD Status</span> and <span class="tooltip">HD</span> or <span class="tooltip">H</span> zoning designations</h5><p>Click the link below. Then enter your address into the search bar. Change “Map Themes” to zoning map, and in “Layers” under “Zoning and Zoning Overlays” check the box for Airport Overlay and National Register of Historic Districts <a class="wizard-links" href="http://www.austintexas.gov/GIS/DevelopmentWebMap/Viewer.aspx">http://www.austintexas.gov/GIS/DevelopmentWebMap/Viewer.aspx</a></p><h5>Is your property in a NRHD or in a H or HD?</h5></div>',
        answers: {
            'Yes': { next:6, checklist:'Please schedule an appointment with the Historic District'},
            'No': {next:6 }
        }
  },

  '6': {
    text: 'Check your property for Airport Overlay Zoning',
    caption: '<div class="inner-container"><h5>Is your property in a Airport Overlay Zone?</h5><p>Click the link below. Then enter your address into the search bar. Change “Map Themes” to zoning map, and in “Layers” under “Zoning and Zoning Overlays” check the box for Airport Overlay and National Register of Historic Districts <a class="wizard-links" href="http://www.austintexas.gov/GIS/DevelopmentWebMap/Viewer.aspx">http://www.austintexas.gov/GIS/DevelopmentWebMap/Viewer.aspx</a></p></div>',
    answers: {
      'Yes': { next:7, checklist:'Please schedule an appointment with the Aviation Department'},
      'No': { next:7}
    }
  },



    '7': {
        text: 'Check your proximity to a flood plain',
		caption: '<div class="inner-container"><h5>Is your property within 150 feet of a floodplain?</h5><p>Visit either of the links below.</p><p><a class="wizard-links" href ="www.ATXFloodPro.com">www.ATXFloodPro.com</a> or the City’s Floodplain Development Information website <a class="wizard-links" href ="http://austintexas.gov/page/floodplain-development-information">http://austintexas.gov/page/floodplain-development-information</a></p></div>',
        answers: {
            'Yes': { next: 8, checklist: 'Please bring a FEMA elevation certificate form with your application' },
            'No': { next: 8 }
        }
    },

    '8': {
        text: "Check your property for expired permits",
		caption: '<div class="inner-container"><h5>Does your property have any expired permits?</h5><p>Check at this link: <a class="wizard-links" href="https://www.austintexas.gov/devreview/a_queryfolder_permits.jsp">https://www.austintexas.gov/devreview/a_queryfolder_permits.jsp</a></p></div>',
        answers: {
            'Yes': { next: 9 },
            'No': { next: 12 }
        }
    },

    '9': {
        text: 'Does the expired permit work qualify for the express permit?',
        answers: {
            'Yes': { next: 12, checklist: 'Add the expired permit work to the current permit' },
            'No': { next: 12, checklist: 'Bring an Acknowledgement of Expired Permit form with your application' }
        }
    },

    '12': {
        permitId:1
    }

};
