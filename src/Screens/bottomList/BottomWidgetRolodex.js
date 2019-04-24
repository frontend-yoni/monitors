function BottomWidgetRolodex(directPapaComponent, ddManager) {
    let me = this;
    let genUtils = JJGeneralUtils.getInstance();
    let staticData = StaticDataStuff.getInstance();
    let completeData = CompleteDataStructure.getInstance();
    let modalComponent = WidgetConfigModal.getInstance();

    /** CONSTANTS **/
    const SCROLL_ANIMDATION_DURATION = 200;
    const FULL_HEIGHT = 100; //Match css --bottomRolodexFullHeight
    /** Externally Set ***/
        //Structure
    let externalDiv;
    //Data
    let data;
    let widgetCompArr;
    /** Internally Set **/
        //Structure
    let scrollContainer;
    let cuteContainerBox;
    let widgetListDiv;
    let dropHintWidgetDiv;
    //State
    let dropWidgetData;

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

    this.onDragRelease = function () {

    };

    this.onReleaseEnd = function () {
        onReleaseEnd();
    };

    this.onDragRelease = function () {
        onDragRelease();
    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        let scrollPad = Math.max(genUtils.getScrollWidth(), 9) + 1;

        externalDiv.jjAddEventListener('mouseenter', onMouseEnter)
            .jjAddEventListener('mouseleave', onMouseLeave);

        cuteContainerBox = externalDiv.jjAppend('div')
            .jjAddClass('BottomWidgetCuteContainerBox')
            .jjStyle({
                bottom: `${scrollPad}px`
            });

        scrollContainer = externalDiv.jjAppend('div')
            .jjAddClass('BottomWidgetRolodexScrollDiv');

        let listHeight = FULL_HEIGHT - scrollPad - 10;
        widgetListDiv = scrollContainer.jjAppend('div')
            .jjAddClass('BottomWidgetRolodexListDiv')
            .jjStyle({
                height: `${listHeight}px`
            });

        addInitialWidgets();
    }

    function addInitialWidgets() {
        for (let i = 0; i < completeData.selectedWidgetsArray.length; i++) {
            createWidgetEntry(completeData.selectedWidgetsArray[i]);
        }

        dropHintWidgetDiv = widgetListDiv.jjAppend('div')
            .jjAddClass('BottomWidgetEntryDiv', 'BottomWidgetEntryHint', 'hiddenHint');
        dropHintWidgetDiv.jjAppend('div')
            .jjAddClass('BottomWidgetIconDiv');
    }

    function createWidgetEntry(widgetIndex) {
        let widgetData = staticData.getWidgetItemData(widgetIndex);

        let entryDiv = widgetListDiv.jjAppend('div')
            .jjAddClass('BottomWidgetEntryDiv')
            .jjSetData(widgetData);

        let deleteButton = entryDiv.jjAppend('div')
            .jjAddClass('BottomWidgetEntryDivDeleteButton', 'ScreenButton')
            .jjAddEventListener('click', onWidgetDeleteClick);
        staticData.populateDivWithSVG(deleteButton, SCREEN_EXPAND_BUTTON_SVG);

        let iconDiv = entryDiv.jjAppend('div')
            .jjAddClass('BottomWidgetIconDiv')
            .jjSetData(widgetData)
            .jjAddEventListener('click', onWidgetClick);

        iconDiv.innerHTML = widgetData.icon;

        return entryDiv;
    }

    /** Actions **/
    function showDropHint() {
        dropHintWidgetDiv.jjRemoveClass('hiddenHint', 'hiddenHintNoAnimation')
            .jjSetData(dropWidgetData);
        dropHintWidgetDiv.jjQuery('.BottomWidgetIconDiv').innerHTML = dropWidgetData.icon;
        scrollToEnd();
    }

    function hideDropHint() {
        dropHintWidgetDiv.jjAddClass('hiddenHint');
    }

    function addNewWidgetInsteadOfHint(widgetIndex) {
        let entryDiv = createWidgetEntry(widgetIndex);

        widgetListDiv.appendChild(entryDiv);
        widgetListDiv.appendChild(dropHintWidgetDiv);

        dropHintWidgetDiv.jjAddClass('hiddenHint', 'hiddenHintNoAnimation');
    }

    function scrollToEnd() {
        let maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        scrollContainer.jjAnimateScroll_horizontal(maxScroll - scrollContainer.scrollLeft, SCROLL_ANIMDATION_DURATION);
    }

    /** Draw **/
    function resize() {

    }

    /** Event Listener **/
    function onWidgetClick(e){
        let target = JJPower.enhance(e.currentTarget);
        let data = target.jjGetData().index;
        modalComponent.openModal(target, data);
    }

    function onMouseEnter(e) {
        if (ddManager.getIsDragging()) {
            let widgetIndex = ddManager.getDDItem().jjGetData();
            dropWidgetData = staticData.getWidgetItemData(widgetIndex);
            ddManager.setDropTargetComponent(me);
            showDropHint();
        }
    }

    function onMouseLeave(e) {
        if (ddManager.getIsDragging()) {
            hideDropHint();
        }
    }

    function onWidgetDeleteClick(e) {
        let deleteDiv = JJPower.enhance(e.target).jjClosest('.BottomWidgetEntryDiv');
        let widgetIconDiv = deleteDiv.jjQuery('.BottomWidgetIconDiv');
        let widgetIndex = deleteDiv.jjGetData().index;
        let dropBCRect = ddManager.getWidgetItemBCRect(widgetIndex);

        let indexInList = widgetListDiv.jjGetChildren().indexOf(deleteDiv);
        genUtils.removeFromArrayByIndex(completeData.selectedWidgetsArray, indexInList);

        let dismissCloneUtil = new WidgetDDCloneUtil();
        dismissCloneUtil.dismissWidgetDiv(widgetIconDiv, dropBCRect);

        deleteDiv.jjAddClass('RemoveBottomWidget')
            .jjAddEventListener('transitionend', onRemoveAnimationEnd);

        //Inner Function
        function onRemoveAnimationEnd(){
            if (e.target !== e.currentTarget) {
                return;
            }
            deleteDiv.jjRemoveMe();
            deleteDiv.jjRemoveEventListener('transitionend', onRemoveAnimationEnd);
        }
    }

    function onDragRelease() {
        ddManager.setDropTarget(dropHintWidgetDiv.firstChild);
    }

    function onReleaseEnd() {
        let widgetIndex = ddManager.getDDItem().jjGetData();
        addNewWidgetInsteadOfHint(widgetIndex);
    }
}