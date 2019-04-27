function CompleteDataStructure() {
    let me = this;

    this.tableScreenDataAray = [];
    this.OtherWidgetsArray = [];
    this.wallScreenData = new ScreenDataObj();
    this.widgetIDToFieldValues = {};

    this.addTableScreen = function (screenData) {
        me.tableScreenDataAray.push(screenData);
    };

    this.addSelectedWidget = function (widgetInstance) {
        me.OtherWidgetsArray.unshift(widgetInstance);
    };

    this.setWallScreen = function (screenObj) {
        me.wallScreenData = screenObj;
    };


    this.populateMockData = function () {
        let mockScreen1 = new ScreenDataObj(3, 1);
        mockScreen1.addWidget(0, 1, 4);

        let mockScreen2 = new ScreenDataObj(2, 2);
        mockScreen2.addWidget(1, 0, 0);
        mockScreen2.addWidget(1, 1, 1);

        let mockScreen3 = new ScreenDataObj(1, 1);

        me.addTableScreen(mockScreen1);
        me.addTableScreen(mockScreen2);
        me.addTableScreen(mockScreen3);

        me.setWallScreen(new ScreenDataObj(3, 3));

        me.addSelectedWidget(new WidgetInstanceDataObj(8));
        me.addSelectedWidget(new WidgetInstanceDataObj(6));
        me.addSelectedWidget(new WidgetInstanceDataObj(9));
        me.addSelectedWidget(new WidgetInstanceDataObj(7));
    }


}

CompleteDataStructure.getInstance = function () {
    if (!CompleteDataStructure.instance) {
        CompleteDataStructure.instance = new CompleteDataStructure();
    }
    return CompleteDataStructure.instance;
};