import { EventEmitter, Optional, Host, SkipSelf, Component, Input, Output, ViewChild, ElementRef, ViewContainerRef, ContentChild, TemplateRef, NgModule } from '@angular/core';
import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager, MapsAPILoader } from '@agm/core';

class AgmSnazzyInfoWindow {
    constructor(_marker, _wrapper, _manager, _loader) {
        this._marker = _marker;
        this._wrapper = _wrapper;
        this._manager = _manager;
        this._loader = _loader;
        /**
         * Changes the open status of the snazzy info window.
         */
        this.isOpen = false;
        /**
         * Emits when the open status changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Choose where you want the info window to be displayed, relative to the marker.
         */
        this.placement = 'top';
        /**
         * The max width in pixels of the info window.
         */
        this.maxWidth = 200;
        /**
         * The max height in pixels of the info window.
         */
        this.maxHeight = 200;
        /**
         * Determines if the info window will open when the marker is clicked.
         * An internal listener is added to the Google Maps click event which calls the open() method.
         */
        this.openOnMarkerClick = true;
        /**
         * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
         * This will not activate on the Google Maps drag event when the user is panning the map.
         */
        this.closeOnMapClick = true;
        /**
         * Determines if the info window will close when any other Snazzy Info Window is opened.
         */
        this.closeWhenOthersOpen = false;
        /**
         * Determines if the info window will show a close button.
         */
        this.showCloseButton = true;
        /**
         * Determines if the info window will be panned into view when opened.
         */
        this.panOnOpen = true;
        /**
         * Emits before the info window opens.
         */
        this.beforeOpen = new EventEmitter();
        /**
         * Emits before the info window closes.
         */
        this.afterClose = new EventEmitter();
        this._snazzyInfoWindowInitialized = null;
    }
    /**
     * @internal
     */
    ngOnChanges(changes) {
        if (this._nativeSnazzyInfoWindow == null) {
            return;
        }
        if ('isOpen' in changes && this.isOpen) {
            this._openInfoWindow();
        }
        else if ('isOpen' in changes && !this.isOpen) {
            this._closeInfoWindow();
        }
        if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
            this._updatePosition();
        }
    }
    /**
     * @internal
     */
    ngAfterViewInit() {
        const m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
        this._snazzyInfoWindowInitialized = this._loader.load()
            .then(() => require('snazzy-info-window'))
            .then((module) => Promise.all([module, m, this._wrapper.getNativeMap()]))
            .then((elems) => {
            const options = {
                map: elems[2],
                content: '',
                placement: this.placement,
                maxWidth: this.maxWidth,
                maxHeight: this.maxHeight,
                backgroundColor: this.backgroundColor,
                padding: this.padding,
                border: this.border,
                borderRadius: this.borderRadius,
                fontColor: this.fontColor,
                pointer: this.pointer,
                shadow: this.shadow,
                closeOnMapClick: this.closeOnMapClick,
                openOnMarkerClick: this.openOnMarkerClick,
                closeWhenOthersOpen: this.closeWhenOthersOpen,
                showCloseButton: this.showCloseButton,
                panOnOpen: this.panOnOpen,
                wrapperClass: this.wrapperClass,
                callbacks: {
                    beforeOpen: () => {
                        this._createViewContent();
                        this.beforeOpen.emit();
                    },
                    afterOpen: () => {
                        this.isOpenChange.emit(this.openStatus());
                    },
                    afterClose: () => {
                        this.afterClose.emit();
                        this.isOpenChange.emit(this.openStatus());
                    },
                },
            };
            if (elems[1] != null) {
                options.marker = elems[1];
            }
            else {
                options.position = {
                    lat: this.latitude,
                    lng: this.longitude,
                };
            }
            this._nativeSnazzyInfoWindow = new elems[0](options);
        });
        this._snazzyInfoWindowInitialized.then(() => {
            if (this.isOpen) {
                this._openInfoWindow();
            }
        });
    }
    _openInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._createViewContent();
            this._nativeSnazzyInfoWindow.open();
        });
    }
    _closeInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._nativeSnazzyInfoWindow.close();
        });
    }
    _createViewContent() {
        if (this._viewContainerRef.length === 1) {
            return;
        }
        const evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
        // we have to run this in a separate cycle.
        setTimeout(() => {
            evr.detectChanges();
        });
    }
    _updatePosition() {
        this._nativeSnazzyInfoWindow.setPosition({
            lat: this.latitude,
            lng: this.longitude,
        });
    }
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    openStatus() {
        return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        if (this._nativeSnazzyInfoWindow) {
            this._nativeSnazzyInfoWindow.destroy();
        }
    }
}
AgmSnazzyInfoWindow.ctorParameters = () => [
    { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
    { type: GoogleMapsAPIWrapper },
    { type: MarkerManager },
    { type: MapsAPILoader }
];
AgmSnazzyInfoWindow.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'agm-snazzy-info-window',
                template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
            },] }
];
AgmSnazzyInfoWindow.ctorParameters = () => [
    { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
    { type: GoogleMapsAPIWrapper },
    { type: MarkerManager },
    { type: MapsAPILoader }
];
AgmSnazzyInfoWindow.propDecorators = {
    latitude: [{ type: Input }],
    longitude: [{ type: Input }],
    isOpen: [{ type: Input }],
    isOpenChange: [{ type: Output }],
    placement: [{ type: Input }],
    maxWidth: [{ type: Input }],
    maxHeight: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    padding: [{ type: Input }],
    border: [{ type: Input }],
    borderRadius: [{ type: Input }],
    fontColor: [{ type: Input }],
    fontSize: [{ type: Input }],
    pointer: [{ type: Input }],
    shadow: [{ type: Input }],
    openOnMarkerClick: [{ type: Input }],
    closeOnMapClick: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    closeWhenOthersOpen: [{ type: Input }],
    showCloseButton: [{ type: Input }],
    panOnOpen: [{ type: Input }],
    beforeOpen: [{ type: Output }],
    afterClose: [{ type: Output }],
    _outerWrapper: [{ type: ViewChild, args: ['outerWrapper', { read: ElementRef, static: false },] }],
    _viewContainerRef: [{ type: ViewChild, args: ['viewContainer', { read: ViewContainerRef, static: false },] }],
    _templateRef: [{ type: ContentChild, args: [TemplateRef, { static: false },] }]
};

class AgmSnazzyInfoWindowModule {
}
AgmSnazzyInfoWindowModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AgmSnazzyInfoWindow],
                exports: [AgmSnazzyInfoWindow],
            },] }
];

// public API

/**
 * Generated bundle index. Do not edit.
 */

export { AgmSnazzyInfoWindow, AgmSnazzyInfoWindowModule };
//# sourceMappingURL=agm-snazzy-info-window.js.map
