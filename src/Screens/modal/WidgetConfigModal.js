function WidgetConfigModal() {
    let me = this;
    let staticData = StaticDataStuff.getInstance();

    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
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

    this.openModal = function (configWidgetI) {
        configWidget = configWidgetI;
        showModal();
    };

    this.resize = function () {
        resize();
    };

    /** Construction **/
    function showModal() {
        construct();
    }

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
        closeButton = titleDiv.jjAppend('div')
            .jjAddClass('ModalCloseButton')
            .jjAddEventListener('click', hideMe);

        let closeIcon = closeButton.jjAppend('div')
            .jjAddClass('ModalCloseButtonIcon');

        staticData.populateDivWithSVG(closeIcon, SCREEN_EXPAND_BUTTON_SVG);
    }

    /** Actions **/
    function hideMe() {
        externalDiv.jjRemoveClass('ModalOpen');
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

