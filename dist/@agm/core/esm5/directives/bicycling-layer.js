import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
var layerId = 0;
/*
 * This directive adds a bicycling layer to a google map instance
 * <agm-bicycling-layer [visible]="true|false"> <agm-bicycling-layer>
 * */
var AgmBicyclingLayer = /** @class */ (function () {
    function AgmBicyclingLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show bicycling layer
         */
        this.visible = true;
    }
    AgmBicyclingLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addBicyclingLayer(this, { visible: this.visible });
        this._addedToManager = true;
    };
    AgmBicyclingLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['visible'] != null) {
            this._manager.toggleLayerVisibility(this, { visible: changes['visible'].currentValue });
        }
    };
    /** @internal */
    AgmBicyclingLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmBicyclingLayer.prototype.toString = function () { return "AgmBicyclingLayer-" + this._id.toString(); };
    /** @internal */
    AgmBicyclingLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteLayer(this);
    };
    AgmBicyclingLayer.ctorParameters = function () { return [
        { type: LayerManager }
    ]; };
    AgmBicyclingLayer.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-bicycling-layer',
                },] }
    ];
    AgmBicyclingLayer.ctorParameters = function () { return [
        { type: LayerManager }
    ]; };
    AgmBicyclingLayer.propDecorators = {
        visible: [{ type: Input }]
    };
    return AgmBicyclingLayer;
}());
export { AgmBicyclingLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmljeWNsaW5nLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEI7OztLQUdLO0FBQ0w7SUFhSSwyQkFBcUIsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVJuQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixRQUFHLEdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTdDOztXQUVHO1FBQ00sWUFBTyxHQUFHLElBQUksQ0FBQztJQUV1QixDQUFDO0lBRWhELG9DQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7U0FDekY7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLDhCQUFFLEdBQUYsY0FBZSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRWpDLGdCQUFnQjtJQUNoQixvQ0FBUSxHQUFSLGNBQXFCLE9BQU8sdUJBQXFCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXpFLGdCQUFnQjtJQUNoQix1Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Z0JBNUI4QixZQUFZOzs7Z0JBYjlDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO2lCQUNsQzs7O2dCQVZRLFlBQVk7OzswQkFtQmhCLEtBQUs7O0lBZ0NWLHdCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0F2Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbGF5ZXItbWFuYWdlcic7XG5cbmxldCBsYXllcklkID0gMDtcblxuLypcbiAqIFRoaXMgZGlyZWN0aXZlIGFkZHMgYSBiaWN5Y2xpbmcgbGF5ZXIgdG8gYSBnb29nbGUgbWFwIGluc3RhbmNlXG4gKiA8YWdtLWJpY3ljbGluZy1sYXllciBbdmlzaWJsZV09XCJ0cnVlfGZhbHNlXCI+IDxhZ20tYmljeWNsaW5nLWxheWVyPlxuICogKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYWdtLWJpY3ljbGluZy1sYXllcicsXG59KVxuXG5leHBvcnQgY2xhc3MgQWdtQmljeWNsaW5nTGF5ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95e1xuICAgIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XG5cbiAgICAvKipcbiAgICAgKiBIaWRlL3Nob3cgYmljeWNsaW5nIGxheWVyXG4gICAgICovXG4gICAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfbWFuYWdlcjogTGF5ZXJNYW5hZ2VyICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmFkZEJpY3ljbGluZ0xheWVyKHRoaXMsIHt2aXNpYmxlOiB0aGlzLnZpc2libGV9KTtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci50b2dnbGVMYXllclZpc2liaWxpdHkodGhpcywge3Zpc2libGU6IGNoYW5nZXNbJ3Zpc2libGUnXS5jdXJyZW50VmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYEFnbUJpY3ljbGluZ0xheWVyLSR7dGhpcy5faWQudG9TdHJpbmcoKX1gOyB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlTGF5ZXIodGhpcyk7XG4gICAgfVxuXG59XG4iXX0=