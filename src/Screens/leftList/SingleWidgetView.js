function SngleWidgetView(directPapaComponent, dataManager) {
    let me = this;
    let genUtils = JJGeneralUtils.getInstance();
    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let iconStr = SCREEN_EXPAND_BUTTON_SVG;
    let name = 'Yoni Bon';
    let widgetIndex;
    /** Internally Set **/
        //Structure
    let iconDiv;
    let nameP;
    let bottomBorder;

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        externalDiv = JJPower.enhance(divHTML);
    };

    this.setData = function (iconStrI, nameI, widgetIndexI) {
        iconStr = iconStrI;
        name = nameI;
        widgetIndex = widgetIndexI;
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
        iconDiv = externalDiv.jjAppend('div')
            .jjAddClass('LeftListIconDiv')
            .jjSetData(widgetIndex)
            .jjSetIndex(widgetIndex);
        iconDiv.innerHTML = iconStr;

        nameP = externalDiv.jjAppend('p')
            .jjAddClass('LeftListNameP')
            .jjText(name);

        bottomBorder = externalDiv.jjAppend('div')
            .jjAddClass('LeftListWidgetBottomBorder')
            .jjStyle({
                right: -genUtils.getScrollWidth() + 'px'
            });
    }

    /** Draw **/
    function resize() {

    }
}