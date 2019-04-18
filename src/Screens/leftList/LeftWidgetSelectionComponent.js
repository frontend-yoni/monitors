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

        for (let i = 0; i < staticData.getWidgetListLength(); i++) {
            addWidget(i);
        }

        ddManager.setAsDraggable(listDiv, 'LeftListIconDiv');
    }

    function addWidget(widgetIndex) {
        let widgetDiv = listDiv.jjAppend('div')
            .jjAddClass('LeftListWidgetDiv')
            .jjSetData(widgetIndex);
        let widgetComp = new SngleWidgetView(me);

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
        let divList = listDiv.jjQueryAll('.LeftListWidgetDiv');
        let widgetDiv = divList.find((div) => {
            return div.jjGetData() === widgetIndex;
        });
        return widgetDiv.jjQuery('.LeftListIconDiv');
    }
}