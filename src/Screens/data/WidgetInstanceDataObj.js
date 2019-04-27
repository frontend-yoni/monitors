function WidgetInstanceDataObj(widgetIndex) {
    this.widgetInstanceID = WidgetInstanceDataObj.lastID++;
    this.widgetIndex = widgetIndex;
    this.fieldIndexToValueMap = {};

    /** Public APIs **/
    this.cloneContent = function (origData) {
        this.widgetIndex = origData.widgetIndex;
        this.fieldIndexToValueMap = Object.assign({}, origData.fieldIndexToValueMap);
    }

}

WidgetInstanceDataObj.lastID = 0;