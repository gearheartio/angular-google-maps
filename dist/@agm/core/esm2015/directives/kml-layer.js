import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
let layerId = 0;
export class AgmKmlLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new EventEmitter();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new EventEmitter();
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    }
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    }
    _updatePolygonOptions(changes) {
        const options = Object.keys(changes)
            .filter(k => AgmKmlLayer._kmlLayerOptions.indexOf(k) !== -1)
            .reduce((obj, k) => {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _addEventListeners() {
        const listeners = [
            { name: 'click', handler: (ev) => this.layerClick.emit(ev) },
            { name: 'defaultviewport_changed', handler: () => this.defaultViewportChange.emit() },
            { name: 'status_changed', handler: () => this.statusChange.emit() },
        ];
        listeners.forEach((obj) => {
            const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmKmlLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(s => s.unsubscribe());
    }
}
AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
AgmKmlLayer.ctorParameters = () => [
    { type: KmlLayerManager }
];
AgmKmlLayer.decorators = [
    { type: Directive, args: [{
                selector: 'agm-kml-layer',
            },] }
];
AgmKmlLayer.ctorParameters = () => [
    { type: KmlLayerManager }
];
AgmKmlLayer.propDecorators = {
    clickable: [{ type: Input }],
    preserveViewport: [{ type: Input }],
    screenOverlays: [{ type: Input }],
    suppressInfoWindows: [{ type: Input }],
    url: [{ type: Input }],
    zIndex: [{ type: Input }],
    layerClick: [{ type: Output }],
    defaultViewportChange: [{ type: Output }],
    statusChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21sLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9rbWwtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSXBILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFLaEIsTUFBTSxPQUFPLFdBQVc7SUF5RHRCLFlBQW9CLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBeERyQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixRQUFHLEdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUk1Qzs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7Ozs7O1dBS0c7UUFDTSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFbEM7O1dBRUc7UUFDTSxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUUvQjs7V0FFRztRQUNNLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUVyQzs7V0FFRztRQUNNLFFBQUcsR0FBVyxJQUFJLENBQUM7UUFFNUI7O1dBRUc7UUFDTSxXQUFNLEdBQWtCLElBQUksQ0FBQztRQUV0Qzs7V0FFRztRQUNPLGVBQVUsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFFdEY7O1dBRUc7UUFDTywwQkFBcUIsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUUvRTs7OztXQUlHO1FBQ08saUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUV0QixDQUFDO0lBRWpELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTztTQUNS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QVEsRUFBRSxlQUFlO2FBQzFCOzs7WUFOUSxlQUFlOzs7d0JBaUJyQixLQUFLOytCQVFMLEtBQUs7NkJBS0wsS0FBSztrQ0FLTCxLQUFLO2tCQUtMLEtBQUs7cUJBS0wsS0FBSzt5QkFLTCxNQUFNO29DQUtOLE1BQU07MkJBT04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgS21sTW91c2VFdmVudCB9IGZyb20gJy4vLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlcic7XG5cbmxldCBsYXllcklkID0gMDtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLWttbC1sYXllcicsXG59KVxuZXhwb3J0IGNsYXNzIEFnbUttbExheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmcgPSAobGF5ZXJJZCsrKS50b1N0cmluZygpO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIHN0YXRpYyBfa21sTGF5ZXJPcHRpb25zOiBzdHJpbmdbXSA9XG4gICAgICBbJ2NsaWNrYWJsZScsICdwcmVzZXJ2ZVZpZXdwb3J0JywgJ3NjcmVlbk92ZXJsYXlzJywgJ3N1cHByZXNzSW5mb1dpbmRvd3MnLCAndXJsJywgJ3pJbmRleCddO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgbGF5ZXIgcmVjZWl2ZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0LCB0aGUgaW5wdXQgbWFwIGlzIGNlbnRlcmVkIGFuZCB6b29tZWQgdG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY29udGVudHMgb2YgdGhlXG4gICAqIGxheWVyLlxuICAgKiBJZiB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZSwgdGhlIHZpZXdwb3J0IGlzIGxlZnQgdW5jaGFuZ2VkLCB1bmxlc3MgdGhlIG1hcCdzIGNlbnRlciBhbmQgem9vbVxuICAgKiB3ZXJlIG5ldmVyIHNldC5cbiAgICovXG4gIEBJbnB1dCgpIHByZXNlcnZlVmlld3BvcnQgPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciB0byByZW5kZXIgdGhlIHNjcmVlbiBvdmVybGF5cy4gRGVmYXVsdCB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgc2NyZWVuT3ZlcmxheXMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBTdXBwcmVzcyB0aGUgcmVuZGVyaW5nIG9mIGluZm8gd2luZG93cyB3aGVuIGxheWVyIGZlYXR1cmVzIGFyZSBjbGlja2VkLlxuICAgKi9cbiAgQElucHV0KCkgc3VwcHJlc3NJbmZvV2luZG93cyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgVVJMIG9mIHRoZSBLTUwgZG9jdW1lbnQgdG8gZGlzcGxheS5cbiAgICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nID0gbnVsbDtcblxuICAvKipcbiAgICogVGhlIHotaW5kZXggb2YgdGhlIGxheWVyLlxuICAgKi9cbiAgQElucHV0KCkgekluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgZmVhdHVyZSBpbiB0aGUgbGF5ZXIgaXMgY2xpY2tlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBsYXllckNsaWNrOiBFdmVudEVtaXR0ZXI8S21sTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEttbE1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgS01MIGxheWVycyBkZWZhdWx0IHZpZXdwb3J0IGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIGRlZmF1bHRWaWV3cG9ydENoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIEtNTCBsYXllciBoYXMgZmluaXNoZWQgbG9hZGluZy5cbiAgICogQXQgdGhpcyBwb2ludCBpdCBpcyBzYWZlIHRvIHJlYWQgdGhlIHN0YXR1cyBwcm9wZXJ0eSB0byBkZXRlcm1pbmUgaWYgdGhlIGxheWVyIGxvYWRlZFxuICAgKiBzdWNjZXNzZnVsbHkuXG4gICAqL1xuICBAT3V0cHV0KCkgc3RhdHVzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFuYWdlcjogS21sTGF5ZXJNYW5hZ2VyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYW5hZ2VyLmFkZEttbExheWVyKHRoaXMpO1xuICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlUG9seWdvbk9wdGlvbnMoY2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGsgPT4gQWdtS21sTGF5ZXIuX2ttbExheWVyT3B0aW9ucy5pbmRleE9mKGspICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKG9iajogYW55LCBrOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXG4gICAgICB7bmFtZTogJ2NsaWNrJywgaGFuZGxlcjogKGV2OiBLbWxNb3VzZUV2ZW50KSA9PiB0aGlzLmxheWVyQ2xpY2suZW1pdChldil9LFxuICAgICAge25hbWU6ICdkZWZhdWx0dmlld3BvcnRfY2hhbmdlZCcsIGhhbmRsZXI6ICgpID0+IHRoaXMuZGVmYXVsdFZpZXdwb3J0Q2hhbmdlLmVtaXQoKX0sXG4gICAgICB7bmFtZTogJ3N0YXR1c19jaGFuZ2VkJywgaGFuZGxlcjogKCkgPT4gdGhpcy5zdGF0dXNDaGFuZ2UuZW1pdCgpfSxcbiAgICBdO1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtS21sTGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlS21sTGF5ZXIodGhpcyk7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxufVxuIl19