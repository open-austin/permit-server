module.exports = {
    '1': {
        text: 'What kind of construction permit do you need to submit?',
        answers: {
            'Commercial': { next: 2 },
            'Residential': { next: 3 }
        }
    },

    '3': {
        text: 'Is it one of the following projects<ul><li>Replacing windows and/or exterior doors of the same size and same location</li><li>Adding/Removing siding or brick</li><li>Repairing a roof to the extent of replacing decking boards/fascia</li><li>Repairing foundation without increasing impervious cover</li><li>Roof mounted solar panels</li><li>Remove/Repair drywall in excess of 32 sq. ft.</li><li>Adding/Replacing insulation</li><li>Tub/Shower Conversions</li></ul>',
        answers: {
            'Yes': { next: 4 },
            'No': { next: 2 }
        }
    },

    '4': {
        text: "Will this project involve any structural members or increase square footage of structure?",
        answers: {
            'Yes': { next: 2 },
            'No': { next: 5 }
        },
    },

    '5': {
        message: 'You have qualified for an express permit',
        text: "Are you in a historic district?",
        answers: {
            'Yes': { next: 6, checklist: 'Please schedule an appointment with the Historic District' },
            'No': { next: 6 }
        }
    },

    '6': {
        text: 'Are you in an airport overlay zone?',
        answers: {
            'Yes': { next: 7, checklist: 'Please schedule an appointment with the Aviation Department' },
            'No': { next: 7 }
        }
    },

    '7': {
        text: 'Are you within 150 feet of a floodplain?',
        answers: {
            'Yes': { next: 8, checklist: 'Please bring a FEMA elevation certificate form with your application' },
            'No': { next: 8 }
        }
    },

    '8': {
        text: "Do you have expired permits?",
        answers: {
            'Yes': { next: 9 },
            'No': { next: 11 }
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