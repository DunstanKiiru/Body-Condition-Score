function handleSelection(step) {
    const form = document.getElementById('bcs-form');
    const result = document.getElementById('result');

    // Clear subsequent steps and result
    while (form.children.length > step + 1) {
        form.removeChild(form.lastChild);
    }
    result.innerHTML = '';

    // Get the selected value of the current step
    const currentSelect = form.querySelector(`#step${step} select`);
    const currentValue = currentSelect.value;

    if (currentValue !== '') {
        if (step === 1) {
            // Store the current value of the line shape dropdown
            const previousLineShapeValue = document.getElementById('line-shape').value;
            
            if (currentValue === 'flattened-v') {
                addHooksShapeStep();
            } else if (currentValue === 'flattened-u') {
                // Trigger a page refresh when switching from 'flattened-v' to 'flattened-u'
                if (previousLineShapeValue === 'flattened-v') {
                    localStorage.setItem('previousLineShapeValue', previousLineShapeValue);
                    location.reload();
                }
                addLigamentVisibilityStep();
            }
        } else if (step === 2) {
            const lineShape = document.getElementById('line-shape').value;
            if (lineShape === 'flattened-v') {
                if (currentValue === 'rounded') {
                    result.innerHTML = 'BCS = 3.0';
                } else if (currentValue === 'angular') {
                    addPinsShapeStep();
                }
            } else if (lineShape === 'flattened-u') {
                checkFlattenedUCondition(currentValue, step);
            }
        } else if (step === 3) {
            const lineShape = document.getElementById('line-shape').value;
            if (lineShape === 'flattened-v') {
                if (currentValue === 'yes') {
                    addFatPadStep();
                } else {
                    result.innerHTML = 'BCS = 2.75';
                }
            } else if (lineShape === 'flattened-u') {
                checkFlattenedUCondition(currentValue, step);
            }
        } else if (step === 4) {
            const lineShape = document.getElementById('line-shape').value;
            if (lineShape === 'flattened-v') {
                if (currentValue === 'fat-pad') {
                    result.innerHTML = 'BCS = 2.50';
                } else if (currentValue === 'no-fat-pad') {
                    addCorrugationsStep();
                }
            } else if (lineShape === 'flattened-u') {
                checkFlattenedUCondition(currentValue, step);
            }
        } else if (step === 5) {
            if (currentValue === 'corrugations-half') {
                result.innerHTML = 'BCS = 2.25';
            } else if (currentValue === 'corrugations-three-quarter') {
                result.innerHTML = 'BCS = 2.0';
            } else if (currentValue === 'prominent-thurl') {
                result.innerHTML = 'BCS < 2.0';
            }
        }
    }
}

function addHooksShapeStep() {
    const step2 = document.createElement('div');
    step2.id = 'step2';
    step2.className = 'step';
    step2.innerHTML = `
        <label>Hooks shape?</label>
        <select id="hooks-shape" name="hooks-shape" onchange="handleSelection(2)">
            <option value="">Select an option</option>
            <option value="rounded">Rounded</option>
            <option value="angular">Angular</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step2);
}

function addPinsShapeStep() {
    const step3 = document.createElement('div');
    step3.id = 'step3';
    step3.className = 'step';
    step3.innerHTML = `
        <label>Are the pins angular?</label>
        <select id="pins-shape" name="pins-shape" onchange="handleSelection(3)">
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step3);
}

function addFatPadStep() {
    const step4 = document.createElement('div');
    step4.id = 'step4';
    step4.className = 'step';
    step4.innerHTML = `
        <label>Palpable fat pad on point of pins?</label>
        <select id="fat-pad" name="fat-pad" onchange="handleSelection(4)">
            <option value="">Select an option</option>
            <option value="fat-pad">Yes</option>
            <option value="no-fat-pad">No</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step4);
}

function addCorrugationsStep() {
    const step5 = document.createElement('div');
    step5.id = 'step5';
    step5.className = 'step';
    step5.innerHTML = `
        <label>Visibility of corrugations on short ribs?</label>
        <select id="corrugations" name="corrugations" onchange="handleSelection(5)">
            <option value="">Select an option</option>
            <option value="corrugations-half">Visible 1/2 way</option>
            <option value="corrugations-three-quarter">Visible 3/4 way</option>
            <option value="prominent-thurl">Prominent Thurl</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step5);
}

function addLigamentVisibilityStep() {
    const step2 = document.createElement('div');
    step2.id = 'step2';
    step2.className = 'step';
    step2.innerHTML = `
        <label>Sacral and tailhead ligament visibility?</label>
        <select id="ligament-visibility" name="ligament-visibility" onchange="handleSelection(2)">
            <option value="">Select an option</option>
            <option value="both-visible">Both Visible</option>
            <option value="sacral-visible & tailhead barely">Sacral Visible & tailhead barely</option>
            <option value="sacral-barely-visible & tailhead not">Sacral Barely Visible & tailhead not</option>
            <option value="none-visible">None Visible</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step2);
}

function addThurlFlatStep() {
    const step3 = document.createElement('div');
    step3.id = 'step3';
    step3.className = 'step';
    step3.innerHTML = `
        <label>Is the thurl flat?</label>
        <select id="thurl-flat" name="thurl-flat" onchange="handleSelection(3)">
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step3);
}

function addRibsVisibleStep() {
    const step4 = document.createElement('div');
    step4.id = 'step4';
    step4.className = 'step';
    step4.innerHTML = `
        <label>Are the tips of the short ribs barely visible?</label>
        <select id="ribs-visible" name="ribs-visible" onchange="handleSelection(4)">
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step4);
}

function checkFlattenedUCondition(value, step) {
    const result = document.getElementById('result');
    switch (value) {
        case 'both-visible':
            result.innerHTML = 'BCS = 3.25';
            break;
        case 'sacral-visible & tailhead barely':
            result.innerHTML = 'BCS = 3.5';
            break;
        case 'sacral-barely-visible & tailhead not':
            result.innerHTML = 'BCS = 3.75';
            break;
        case 'none-visible':
            addThurlFlatStep();
            break;
        case 'yes':
            // Add the condition for handling thurl flat
            handleThurlFlat();
            break;
        case 'no':
            result.innerHTML = 'BCS = 4';
            break;
        case 'ribs-barely-visible':
            result.innerHTML = 'BCS = 4.25';
            break;
        case 'pins-buried':
            result.innerHTML = 'BCS = 4.5';
            break;
        case 'hooks-barely-visible':
            result.innerHTML = 'BCS = 4.75';
            break;
        case 'prominences-rounded':
            result.innerHTML = 'BCS = 5.0';
            break;
        default:
            break;
    }
}

// Function to handle the cases when thurl is found to be flat
function handleThurlFlat() {
    const step4 = document.createElement('div');
    step4.id = 'step4';
    step4.className = 'step';
    step4.innerHTML = `
        <label>Choose the condition:</label>
        <select id="thurl-flat-condition" name="thurl-flat-condition" onchange="handleSelection(4)">
            <option value="">Select an option</option>
            <option value="ribs-barely-visible">Tip of short ribs barely visible</option>
            <option value="pins-buried">Thurl flat and pins buried</option>
            <option value="hooks-barely-visible">Hooks barely visible</option>
            <option value="prominences-rounded">All boney prominences well rounded</option>
        </select>
    `;
    document.getElementById('bcs-form').appendChild(step4);
}

