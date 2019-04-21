function LeftWidgetSelectionComponent(directPapaComponent, ddManager) {
    let me = this;
    let genUtils = JJGeneralUtils.getInstance();
    let staticData = StaticDataStuff.getInstance();
    ddManager.setLeftListComponent(me);
    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let data;

    /** Internally Set **/
        //Structure
    let listDiv;
    let widgetDivArr = [];
    //Data
    let lastScreenIndex;

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        externalDiv = JJPower.enhance(divHTML);
    };

    this.setData = function (dataI) {
        data = dataI;
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    /** Internally Used Public APIs **/
    this.getWidgetBCRect = function (widgetIndex) {
        let widgetDiv = getIconDivByWidgetIndex(widgetIndex);
        return widgetDiv.getBoundingClientRect();
    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        let totalWidth = externalDiv.getBoundingClientRect().width;
        let scrollWidth = genUtils.getScrollWidth(externalDiv);
        let listWidth = totalWidth - scrollWidth;

        listDiv = externalDiv.jjAppend('div')
            .jjAddClass('LeftListInnerListDiv')
            .jjStyle({
                width: listWidth + 'px'
            });

        lastScreenIndex = staticData.getScreenWidgetCount() - 1;
        addScreenWidgets();
        addOtherWidgets();

        ddManager.setAsDraggable(listDiv, 'LeftListIconDiv');
    }

    function addScreenWidgets() {
        let startIndex = 0;
        let endIndex = lastScreenIndex;
        addListSection(startIndex, endIndex, 'Screen')
    }

    function addOtherWidgets() {
        let startIndex = lastScreenIndex + 1;
        let endIndex = staticData.getWidgetListLength() - 1;
        addListSection(startIndex, endIndex, 'Other')
    }

    function addListSection(startIndex, endIndex, sectionTitleText) {
        addTitle(sectionTitleText);
        for (let i = startIndex; i < endIndex + 1; i++) {
            addWidget(i);
        }
    }

    function addTitle(sectionTitleText) {
        let titleDiv = listDiv.jjAppend('div')
            .jjAddClass('LeftListSectionTitleDiv');

        titleDiv.jjAppend('div')
            .jjAddClass('SectionTitleBorder', 'SectionTitleLeftBorder');

        titleDiv.jjAppend('p')
            .jjText(sectionTitleText);

        titleDiv.jjAppend('div')
            .jjAddClass('SectionTitleBorder', 'SectionTitleRightBorder');
    }

    function addWidget(widgetIndex) {
        let widgetDiv = listDiv.jjAppend('div')
            .jjAddClass('LeftListWidgetDiv')
            .jjSetData(widgetIndex);
        let widgetComp = new SngleWidgetView(me);

        if(widgetIndex == lastScreenIndex){
            widgetDiv.jjAddClass('LastScreenWidget');
        }

        let nameAndIcon = staticData.getWidgetItemData(widgetIndex);
        widgetComp.setData(nameAndIcon.icon, nameAndIcon.name, widgetIndex);
        widgetComp.setExternalDiv(widgetDiv);
        widgetComp.drawComponent();
    }

    /** Draw **/
    function resize() {

    }

    /** Util **/
    function getIconDivByWidgetIndex(widgetIndex) {
        let divArray = externalDiv.jjQueryAll('.LeftListWidgetDiv');
        let widgetDiv = divArray.find((div) => {
            return div.jjGetData() === widgetIndex;
        });
        return widgetDiv.jjQuery('.LeftListIconDiv');
    }
}