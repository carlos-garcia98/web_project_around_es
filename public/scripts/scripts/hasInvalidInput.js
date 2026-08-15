export function hasInvalidInput(inputList) {
    return Array.from(inputList).some(input => !input.validity.valid);
}
