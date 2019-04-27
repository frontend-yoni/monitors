function WidgetConfigModalBody(directPapaComponent, dataManager) {
    let me = this;
    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let widgetData;

    /** Internally Set **/
        //Structure
    let fieldInputRowsSection;
    let fieldRowArray;
    let submitButton;

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        externalDiv = JJPower.enhance(divHTML);
    };

    this.setWidgetData = function (dataI) {
        widgetData = dataI;
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        fieldInputRowsSection = externalDiv.jjAppend('div')
            .jjAddClass('ModalBodyFieldInputRowSection');

        let fieldsArr = StaticDataStuff.getInstance().getWidgetItemData(widgetData).configFields;
        for (let i = 0; i < fieldsArr.length; i++) {
            addFieldRow(i, fieldsArr[i]);
        }

        addSubmitButton();
    }

    function addFieldRow(index, nameText = 'Configuration Filed') {
        let rowDiv = fieldInputRowsSection.jjAppend('div')
            .jjAddClass('ModalBodyFieldRow');

        let fieldName = rowDiv.jjAppend('p')
            .jjAddClass('ModalBodyFieldName')
            .jjText(nameText);

        let fieldInput = rowDiv.jjAppend('input')
            .jjAttr({
                type: 'text'
            })
            .jjAddClass('ModalBodyFieldInput');
    }

    function addSubmitButton() {
        submitButton = externalDiv.jjAppend('button')
            .jjAddClass('ConfigModalSubmitButton')
            .jjText('Save');
    }

    /** Draw **/
    function resize() {

    }
}