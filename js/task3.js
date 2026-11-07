"use strict";

const TOTAL_SKILL_POINTS = 20;
const MIN_SKILL_VALUE = 1;
const MAX_SKILL_VALUE = 10;
const STORAGE_KEY = "sopranosCustomCharacters";

const TAKEN_NAMES = [
    "Tony Soprano",
    "Carmela Soprano",
    "Christopher Moltisanti",
    "Paulie Gualtieri",
    "Silvio Dante",
    "Junior Soprano",
    "Meadow Soprano",
    "Anthony Soprano",
    "Adriana La Cerva",
    "Jennifer Melfi"
];

const CLASS_REQUIREMENTS = {
    boss: {
        skill: "leadership",
        minimum: 5
    },
    underboss: {
        skill: "intelligence",
        minimum: 5
    },
    enforcer: {
        skill: "strength",
        minimum: 5
    },
    consigliere: {
        skill: "loyalty",
        minimum: 5
    }
};

const COLOR_NAMES = {
    crimson: "Crimson",
    gold: "Gold",
    black: "Black",
    ivory: "Ivory"
};

const form = document.getElementById("character-form");
const formErrors = document.getElementById("form-errors");

const nameInput = document.getElementById("character-name");
const classInput = document.getElementById("character-class");
const colorInput = document.getElementById("character-color");

const skillInputs = {
    strength: document.getElementById("strength"),
    intelligence: document.getElementById("intelligence"),
    leadership: document.getElementById("leadership"),
    loyalty: document.getElementById("loyalty")
};

const pointsUsedElement = document.getElementById("points-used");
const pointsRemainingElement = document.getElementById("points-remaining");
const skillPointsError = document.getElementById("skill-points-error");

const previewName = document.getElementById("preview-name");
const previewClass = document.getElementById("preview-class");
const previewColor = document.getElementById("preview-color");
const previewTotal = document.getElementById("preview-total");

const previewStrength = document.getElementById("preview-strength");
const previewIntelligence = document.getElementById("preview-intelligence");
const previewLeadership = document.getElementById("preview-leadership");
const previewLoyalty = document.getElementById("preview-loyalty");

const characterPreview = document.getElementById("character-preview");
const creationResult = document.getElementById("creation-result");

const allFields = [
    nameInput,
    classInput,
    colorInput,
    ...Object.values(skillInputs)
];

const fieldErrorElements = {};

allFields.forEach(function (field) {
    const errorId = field.getAttribute("aria-describedby");
    if (errorId) {
        fieldErrorElements[field.id] = document.getElementById(errorId);
    }
});

let preserveCreationResultOnReset = false;
form.noValidate = true;

function getSkillTotal() {
    return Object.values(skillInputs).reduce(function (total, input) {
        return total + Number(input.value || 0);
    }, 0);
}

function getSkillValues() {
    return {
        strength: Number(skillInputs.strength.value || 0),
        intelligence: Number(skillInputs.intelligence.value || 0),
        leadership: Number(skillInputs.leadership.value || 0),
        loyalty: Number(skillInputs.loyalty.value || 0)
    };
}

function updateSkillPoints() {
    const total = getSkillTotal();
    const remaining = TOTAL_SKILL_POINTS - total;

    pointsUsedElement.textContent = `${total} / ${TOTAL_SKILL_POINTS}`;
    pointsRemainingElement.textContent = remaining;

    if (total !== TOTAL_SKILL_POINTS) {
        skillPointsError.textContent = `You must use exactly ${TOTAL_SKILL_POINTS} skill points.`;
        skillPointsError.hidden = false;
    } else {
        skillPointsError.textContent = "";
        skillPointsError.hidden = true;
    }

    return total;
}

function updatePreview() {
    const name = nameInput.value.trim();
    const selectedClass = classInput.value;
    const selectedColor = colorInput.value;
    const skills = getSkillValues();
    const total = updateSkillPoints();

    previewName.textContent = name || "Your Character";
    previewClass.textContent = selectedClass
        ? selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)
        : "Not selected";

    previewColor.textContent = selectedColor
        ? COLOR_NAMES[selectedColor] || selectedColor
        : "Not selected";

    previewTotal.textContent = `${total} / ${TOTAL_SKILL_POINTS}`;

    previewStrength.textContent = skills.strength;
    previewIntelligence.textContent = skills.intelligence;
    previewLeadership.textContent = skills.leadership;
    previewLoyalty.textContent = skills.loyalty;

    characterPreview.classList.remove(
        "preview-color-crimson",
        "preview-color-gold",
        "preview-color-black",
        "preview-color-ivory"
    );

    if (selectedColor && COLOR_NAMES[selectedColor]) {
        characterPreview.classList.add(`preview-color-${selectedColor}`);
    }
}

function clearFieldError(field) {
    field.classList.remove("field-invalid", "field-valid");
    field.removeAttribute("aria-invalid");

    const errorElement = fieldErrorElements[field.id];
    if (errorElement) {
        errorElement.textContent = "";
        errorElement.hidden = true;
    }
}

function clearValidation() {
    formErrors.replaceChildren();
    formErrors.hidden = true;

    allFields.forEach(function (field) {
        clearFieldError(field);
    });

    skillPointsError.textContent = "";
    skillPointsError.hidden = true;
}

function validateField(field, label) {
    const errors = [];
    if (field.validity.valueMissing) errors.push(`${label} is required.`);
    if (field.validity.tooShort) errors.push(`${label} is too short.`);
    if (field.validity.tooLong) errors.push(`${label} is too long.`);
    if (field.validity.patternMismatch) errors.push(`${label} contains invalid characters.`);
    if (field.validity.rangeUnderflow) errors.push(`${label} is below the minimum value.`);
    if (field.validity.rangeOverflow) errors.push(`${label} exceeds the maximum value.`);
    if (field.validity.stepMismatch) errors.push(`${label} must be a whole number.`);
    return errors;
}

function getCustomFieldErrors(field) {
    const errors = [];
    if (field === nameInput) {
        const normalizedName = nameInput.value.trim().toLowerCase();
        if (normalizedName && TAKEN_NAMES.some(t => t.toLowerCase() === normalizedName)) {
            errors.push("This character name is already taken.");
        }
    }

    if (field === classInput && classInput.value) {
        const requirement = CLASS_REQUIREMENTS[classInput.value];
        if (requirement) {
            const skillValue = Number(skillInputs[requirement.skill].value || 0);
            if (skillInputs[requirement.skill].value !== "" && skillValue < requirement.minimum) {
                errors.push(`${classInput.value} requires ${requirement.skill} to be at least ${requirement.minimum}.`);
            }
        }
    }
    return errors;
}

function updateFieldValidation(field) {
    clearFieldError(field);
    const label = field.labels[0]?.textContent.trim() || field.id;
    const errors = [...validateField(field, label), ...getCustomFieldErrors(field)];

    if (errors.length > 0) {
        field.classList.add("field-invalid");
        field.setAttribute("aria-invalid", "true");
        const errorElement = fieldErrorElements[field.id];
        if (errorElement) {
            errorElement.textContent = errors.join(" ");
            errorElement.hidden = false;
        }
    } else if (field.value.trim() !== "") {
        field.classList.add("field-valid");
        field.setAttribute("aria-invalid", "false");
    }
}

function updateRelatedValidation(field) {
    updateFieldValidation(field);
    if (Object.values(skillInputs).includes(field)) {
        if (classInput.value) updateFieldValidation(classInput);
    }
    if (field === classInput) {
        const requirement = CLASS_REQUIREMENTS[classInput.value];
        if (requirement) updateFieldValidation(skillInputs[requirement.skill]);
    }
}

function validateForm() {
    const errors = {
        name: validateField(nameInput, "Character name"),
        class: validateField(classInput, "Character class"),
        color: validateField(colorInput, "Character color")
    };

    Object.entries(skillInputs).forEach(function ([skill, input]) {
        errors[skill] = validateField(input, skill);
    });

    const normalizedName = nameInput.value.trim().toLowerCase();
    if (normalizedName && TAKEN_NAMES.some(t => t.toLowerCase() === normalizedName)) {
        errors.name.push("This character name is already taken.");
    }

    const selectedClass = classInput.value;
    const requirement = CLASS_REQUIREMENTS[selectedClass];
    const skills = getSkillValues();

    if (requirement && skills[requirement.skill] < requirement.minimum) {
        errors.class.push(`${selectedClass} requires ${requirement.skill} to be at least ${requirement.minimum}.`);
    }

    const total = getSkillTotal();
    errors.skills = total !== TOTAL_SKILL_POINTS ? [`You must use exactly ${TOTAL_SKILL_POINTS} skill points.`] : [];

    return errors;
}

function showFormErrors(errors) {
    clearValidation();
    const allErrors = [];
    const fieldMap = {
        name: nameInput,
        class: classInput,
        color: colorInput,
        strength: skillInputs.strength,
        intelligence: skillInputs.intelligence,
        leadership: skillInputs.leadership,
        loyalty: skillInputs.loyalty
    };

    Object.entries(errors).forEach(function ([key, messages]) {
        if (messages.length === 0) return;
        messages.forEach(m => allErrors.push(m));
        const field = fieldMap[key];
        if (field) {
            field.classList.add("field-invalid");
            field.setAttribute("aria-invalid", "true");
            const errorElement = fieldErrorElements[field.id];
            if (errorElement) {
                errorElement.textContent = messages.join(" ");
                errorElement.hidden = false;
            }
        }
    });

    if (errors.skills.length > 0) {
        skillPointsError.textContent = errors.skills.join(" ");
        skillPointsError.hidden = false;
    }

    if (allErrors.length > 0) {
        const heading = document.createElement("p");
        heading.textContent = `Please correct ${allErrors.length} error(s):`;
        formErrors.appendChild(heading);

        const list = document.createElement("ul");
        allErrors.forEach(message => {
            const item = document.createElement("li");
            item.textContent = message;
            list.appendChild(item);
        });
        formErrors.appendChild(list);
        
        // jQuery анимация для показа ошибок
        $('#form-errors').hide().removeClass('d-none').slideDown(400);
        formErrors.hidden = false;
    } else {
        Object.values(fieldMap).forEach(field => {
            field.classList.add("field-valid");
            field.setAttribute("aria-invalid", "false");
        });
    }
}

function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
}

function createResultCard() {
    const card = document.createElement("div");
    card.className = `result-card result-${colorInput.value}`;

    const title = createTextElement("h3", "result-name", nameInput.value.trim());
    const role = createTextElement("p", "result-class", `Class: ${classInput.value}`);
    const color = createTextElement("p", "result-color", `Color: ${COLOR_NAMES[colorInput.value] || colorInput.value}`);
    const total = createTextElement("p", "result-total", `Total skill points: ${getSkillTotal()}`);
    const skills = createTextElement("ul", "result-skills", "");

    Object.entries(getSkillValues()).forEach(function ([skill, value]) {
        const item = createTextElement("li", "", `${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${value}`);
        skills.appendChild(item);
    });

    card.append(title, role, color, total, skills);
    return card;
}

// Сохранение персонажа в localStorage
function saveCustomCharacter(charData) {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const customChars = stored ? JSON.parse(stored) : [];
        customChars.push(charData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customChars));
    } catch (e) {
        console.error("Could not save character", e);
    }
}

allFields.forEach(function (field) {
    field.addEventListener("input", function () {
        updatePreview();
        updateRelatedValidation(field);
    });
    field.addEventListener("change", function () {
        updatePreview();
        updateRelatedValidation(field);
    });
    field.addEventListener("blur", function () {
        updateRelatedValidation(field);
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const errors = validateForm();
    showFormErrors(errors);

    const hasErrors = Object.values(errors).some(messages => messages.length > 0);

    if (hasErrors) {
        const firstInvalidField = form.querySelector('[aria-invalid="true"]');
        if (firstInvalidField) {
            firstInvalidField.focus();
        } else if (errors.skills.length > 0) {
            skillInputs.strength.focus();
        } else {
            formErrors.focus();
        }
        return;
    }

    // Сохраняем нового персонажа
    const newCharacter = {
        id: "custom-" + Date.now(),
        name: nameInput.value.trim(),
        role: classInput.value.charAt(0).toUpperCase() + classInput.value.slice(1),
        family: "Custom Family",
        seasons: 1,
        isLeadCharacter: classInput.value === "boss" || classInput.value === "underboss",
        isCustom: true
    };

    saveCustomCharacter(newCharacter);

    const resultCard = createResultCard();
    creationResult.replaceChildren(resultCard);
    creationResult.hidden = false;

    preserveCreationResultOnReset = true;
    form.reset();
});

form.addEventListener("reset", function () {
    window.setTimeout(function () {
        clearValidation();
        updatePreview();
        if (!preserveCreationResultOnReset) {
            creationResult.replaceChildren();
            creationResult.hidden = true;
        }
        preserveCreationResultOnReset = false;
    }, 0);
});

clearValidation();
updatePreview();