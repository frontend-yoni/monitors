function MiniScreenDivsComponent(directPapaComponent, layoutManager, ddManager) {
    let me = this;
    let staticData = StaticDataStuff.getInstance();
    let modalComponent = WidgetConfigModal.getInstance();

    /** CONSTANTS **/

    /** Externally Set ***/
        //Structure
    let miniScreensPapaDiv;
    //Data
    let screenDataObj;

    /** Internally Set **/
        //Structure
    let miniScreensMatrix = [];
    let dropHintWidgetDiv;
    let dropMiniScreen;

    /** Public APIs **/
    this.setExternalDiv = function (divHTML) {
        miniScreensPapaDiv = JJPower.enhance(divHTML);
    };

    this.setData = function (dataI) {
        screenDataObj = dataI;
        miniScreensMatrix = [];
    };

    this.drawComponent = function () {
        drawComponent();
    };

    this.resize = function () {
        resize();
    };

    this.highlightAsDropHint = function (rowIndex, columnIndex, iconStr) {
        let miniScreenDiv = getMiniScreenByIndex(rowIndex, columnIndex);
        highlightAsDropHint(miniScreenDiv);
    };

    this.unhighlightAllAsDropHint = function () {
        unHighlightAll();
    };

    this.onReleaseEnd = function () {
        unHighlightAll();
    };

    this.onDragRelease = function () {
        onDragRelease();
        directPapaComponent.onDragRelease();
    };

    this.removeScreensOnResize = function (didRemovePapaScreen) {
        removeScreensOnResize(didRemovePapaScreen);
    };

    /** Construction **/
    function drawComponent() {
        construct();
    }

    function construct() {
        for (let row = 0; row < screenDataObj.height; row++) {
            for (let column = 0; column < screenDataObj.width; column++) {
                getMiniScreenByIndex(row, column);
            }
        }
    }

    /** Draw **/
    function resize() {

    }

    function getMiniScreenByIndex(rowIndex, columnIndex) {
        if (!miniScreensMatrix[rowIndex]) {
            miniScreensMatrix[rowIndex] = [];
        }
        let rowCellsArray = miniScreensMatrix[rowIndex];
        let miniScreenDiv;
        if (!rowCellsArray[columnIndex]) {
            miniScreenDiv = createMiniScreen(rowIndex, columnIndex);
            rowCellsArray[columnIndex] = miniScreenDiv;
            positionMiniScreen(miniScreenDiv, rowIndex, columnIndex);
        }
        miniScreenDiv = rowCellsArray[columnIndex];


        return miniScreenDiv;
    }

    function createMiniScreen(row, column) {
        let miniScreen = miniScreensPapaDiv.jjAppend('div')
            .jjAddClass('MiniScreenDiv')
            .jjAttr({
                row: row,
                column: column
            })
            .jjAddEventListener('mouseenter', onMouseEnter)
            .jjAddEventListener('mouseleave', onMouseLeave);

        let widgetDeleteButton = miniScreen.jjAppend('div')
            .jjAddClass('MiniScreenWidgetDeleteButton')
            .jjAddEventListener('click', onWidgetDeleteClick);
        staticData.populateDivWithSVG(widgetDeleteButton, SCREEN_EXPAND_BUTTON_SVG);

        let widgetDiv = miniScreen.jjAppend('div')
            .jjAddClass('MiniScreenWidgetDiv')
            .jjAddEventListener('click', onWidgetClick);


        let widgetIndex = screenDataObj.getWidget(row, column);
        if (widgetIndex >= 0) {
            addWidgetSVG(miniScreen, widgetIndex);
            miniScreen.setAttribute('hasWidget', true);
            miniScreen.jjSetData(widgetIndex);
        }

        return miniScreen;
    }

    function positionMiniScreen(miniScreenDiv, rowIndex, columnIndex) {
        let singleWidth = layoutManager.getMeasurementsPack().singleWidth;
        let singleHeight = layoutManager.getMeasurementsPack().singleHeight;

        miniScreenDiv.jjStyle({
            left: columnIndex * singleWidth + 'px',
            bottom: rowIndex * singleHeight + 'px',
            width: singleWidth + 'px',
            height: singleHeight + 'px'
        }).jjAttr({
            row: rowIndex,
            column: columnIndex
        });
    }

    function getWidgetItemDiv(rowIndex, columnIndex) {
        let miniScreenDiv = getMiniScreenByIndex(rowIndex, columnIndex);
        return miniScreenDiv.jjQuery('.MiniScreenWidgetDiv');
    }

    /** Actions **/
    function highlightAsDropHint(miniScreenDiv) {
        unHighlightAll(miniScreenDiv);
        miniScreenDiv.jjAddClass('dropHintMiniScreen');
    }

    function unHighlightAll() {
        let children = miniScreensPapaDiv.jjQueryAll(`* > .dropHintMiniScreen`);
        for (let miniScreenDiv of children) {
            miniScreenDiv.jjRemoveClass('dropHintMiniScreen');
            removeHintWidgetSVG(miniScreenDiv);
        }
    }

    function addWidgetSVG(miniScreenDiv, widgetIndex) {
        let iconStr = staticData.getWidgetItemData(widgetIndex).icon;
        let widgetDiv = miniScreenDiv.jjQuery('.MiniScreenWidgetDiv');
        widgetDiv.innerHTML = iconStr;
        widgetDiv.jjSetData(widgetIndex);
    }

    function removeHintWidgetSVG(miniScreenDiv) {
        if (!getHasWidgetAlready(miniScreenDiv)) {
            let widgetDiv = miniScreenDiv.jjQuery('.MiniScreenWidgetDiv');
            widgetDiv.jjClear();
        }
    }

    function removeWidgetNow(minScreenDiv) {
        let widgetIconDiv = minScreenDiv.jjQuery('.MiniScreenWidgetDiv');
        let widgetIndex = minScreenDiv.jjGetData();
        let dropBCRect = ddManager.getWidgetItemBCRect(widgetIndex);

        let dismissCloneUtil = new WidgetDDCloneUtil();
        dismissCloneUtil.dismissWidgetDiv(widgetIconDiv, dropBCRect);

        widgetIconDiv.jjClear();
        minScreenDiv.removeAttribute('hasWidget');
        minScreenDiv.jjSetData(undefined);

        screenDataObj.removeWidget(+minScreenDiv.getAttribute('row'), +minScreenDiv.getAttribute('column'));
    }

    function removeScreensOnResize(didRemovePapaScreen) {
        let miniScreenArr = miniScreensPapaDiv.jjQueryAll('.MiniScreenDiv');
        let row;
        let column;
        for (let miniScreenDiv of miniScreenArr) {
            row = +miniScreenDiv.getAttribute('row');
            column = +miniScreenDiv.getAttribute('column');
            if (didRemovePapaScreen || row >= screenDataObj.height || column >= screenDataObj.width) {
                if (miniScreenDiv.jjGetData() !== undefined) {
                    removeWidgetNow(miniScreenDiv);
                }
            }
        }
    }

    /** Event Listeners **/
    function onWidgetClick(e) {
        let target = JJPower.enhance(e.currentTarget);
        let miniScreenDiv = target.jjClosest('.MiniScreenDiv');
        let data = miniScreenDiv.jjGetData();
        let widgetInstance = miniScreenDiv.jjWidgetInstance;
        modalComponent.openModal(target, data, widgetInstance);
    }

    function onMouseEnter(e) {
        let miniScreen = JJPower.enhance(e.currentTarget);
        if (ddManager.getIsDragging() && !getHasWidgetAlready(miniScreen)) {
            onDragOver(e, miniScreen)
        }
    }

    function onMouseLeave(e) {
        if (ddManager.getIsDragging()) {
            onDragLeave();
        }
    }

    function onWidgetDeleteClick(e) {
        let deleteDiv = JJPower.enhance(e.target).jjClosest('.MiniScreenDiv');
        removeWidgetNow(deleteDiv);
    }

    /** Drag and Drop Life Cycle **/
    function onDragOver(e, miniScreen) {
        highlightAsDropHint(miniScreen);
        addWidgetSVG(miniScreen, ddManager.getDDData());
        dropMiniScreen = miniScreen;
        dropHintWidgetDiv = miniScreen.jjQuery('.MiniScreenWidgetDiv');
        ddManager.setDropTargetComponent(me);
    }

    function onDragLeave() {
        dropHintWidgetDiv = undefined;
        ddManager.setAsUnDroppable();
        unHighlightAll();
    }

    function onDragRelease() {
        ddManager.setDropTarget(dropHintWidgetDiv);
        if (dropHintWidgetDiv) {
            let widgetIndex = ddManager.getDDData();
            let widgetInstanceData = createWidgetData(widgetIndex);

            dropMiniScreen.setAttribute('hasWidget', true);
            dropMiniScreen.jjSetData(widgetIndex);

            dropMiniScreen.jjWidgetInstance = widgetInstanceData;
            screenDataObj.addWidget(+dropMiniScreen.getAttribute('row'), +dropMiniScreen.getAttribute('column'), widgetIndex, widgetInstanceData);
        }

        dropHintWidgetDiv = undefined;
    }

    /** State **/
    function getHasWidgetAlready(miniScreen) {
        return miniScreen.getAttribute('hasWidget');
    }

    /** Data **/
    function createWidgetData(widgetIndex) {
        let dataObj = new WidgetInstanceDataObj(widgetIndex);
        return dataObj;
    }
}