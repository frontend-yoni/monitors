function WidgetConfigModal() {
    let me = this;
    let staticData = StaticDataStuff.getInstance();

    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let widgetIconDiv;
    let configWidget;

    /** Internally Set **/
        //Structure
    let actualModalDiv;
    let titleDiv;
    let closeButton;
    let bodyDiv;

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        externalDiv = JJPower.enhance(divHTML);
        externalDiv.addEventListener('click', onModalClick);
    };

    this.openModal = function (widgetIconDivI, configWidgetI) {
        widgetIconDiv = widgetIconDivI;
        configWidget = configWidgetI;
        showModal();
    };

    this.resize = function () {
        resize();
    };

    /** Construction **/
    function construct() {
        externalDiv.jjClear();
        externalDiv.jjAddClass('ModalOpen');

        actualModalDiv = externalDiv.jjAppend('div')
            .jjAddClass('WidgetConfigActualModal');

        titleDiv = actualModalDiv.jjAppend('div')
            .jjAddClass('ConfigModalTitleDiv');

        bodyDiv = actualModalDiv.jjAppend('div')
            .jjAddClass('ConfigModalBodyDiv');

        populateTitle();
    }

    function populateTitle() {
        addCloseButton();

        let widgetIndex = configWidget;

        let widgetIconDiv = titleDiv.jjAppend('div')
            .jjAddClass('ModalTitleIconDiv');
        let titleWidgetNameP = titleDiv.jjAppend('p')
            .jjAddClass('ModalTitleNAmeP');

        let widgetIconAndName = staticData.getWidgetItemData(widgetIndex);


        staticData.populateDivWithSVG(widgetIconDiv, widgetIconAndName.icon);
        titleWidgetNameP.jjText(widgetIconAndName.name);
    }

    function addCloseButton() {
        closeButton = titleDiv.jjAppend('div')
            .jjAddClass('ModalCloseButton')
            .jjAddEventListener('click', hideMe);

        let closeIcon = closeButton.jjAppend('div')
            .jjAddClass('ModalCloseButtonIcon');

        staticData.populateDivWithSVG(closeIcon, SCREEN_EXPAND_BUTTON_SVG);
    }

    /** Actions **/
    function showModal() {
        widgetIconDiv.jjAddClass('WidgetIconSelectedForModal');
        construct();
    }

    function hideMe() {
        externalDiv.jjRemoveClass('ModalOpen');
        if (widgetIconDiv) {
            widgetIconDiv.jjRemoveClass('WidgetIconSelectedForModal');
        }
    }

    /** Event Listeners **/
    function onModalClick(e) {
        if (!e.target.closest('.WidgetConfigActualModal')) {
            hideMe();
        }
    }

    /** Draw **/
    function resize() {

    }
}

WidgetConfigModal.getInstance = function () {
    if (!WidgetConfigModal.instance) {
        WidgetConfigModal.instance = new WidgetConfigModal();
    }
    return WidgetConfigModal.instance;
};

