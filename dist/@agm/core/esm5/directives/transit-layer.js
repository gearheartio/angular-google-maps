import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
var layerId = 0;
/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
var AgmTransitLayer = /** @class */ (function () {
    function AgmTransitLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show transit layer
         */
        this.visible = true;
    }
    AgmTransitLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addTransitLayer(this, { visible: this.visible });
        this._addedToManager = true;
    };
    AgmTransitLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        if (changes['visible'] != null) {
            this._manager.toggleLayerVisibility(this, { visible: changes['visible'].currentValue });
        }
    };
    /** @internal */
    AgmTransitLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmTransitLayer.prototype.toString = function () { return "AgmTransitLayer-" + this._id.toString(); };
    /** @internal */
    AgmTransitLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteLayer(this);
    };
    AgmTransitLayer.ctorParameters = function () { return [
        { type: LayerManager }
    ]; };
    AgmTransitLayer.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-transit-layer',
                },] }
    ];
    AgmTransitLayer.ctorParameters = function () { return [
        { type: LayerManager }
    ]; };
    AgmTransitLayer.propDecorators = {
        visible: [{ type: Input }]
    };
    return AgmTransitLayer;
}());
export { AgmTransitLayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdC1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdHJhbnNpdC1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWxFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQjs7O0tBR0s7QUFDTDtJQWFJLHlCQUFxQixRQUFzQjtRQUF0QixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBUm5DLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFFBQUcsR0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFN0M7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBRXVCLENBQUM7SUFFaEQsa0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7U0FDekY7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLDRCQUFFLEdBQUYsY0FBZSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRWpDLGdCQUFnQjtJQUNoQixrQ0FBUSxHQUFSLGNBQXFCLE9BQU8scUJBQW1CLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXZFLGdCQUFnQjtJQUNoQixxQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Z0JBNUI4QixZQUFZOzs7Z0JBYjlDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs7O2dCQVZRLFlBQVk7OzswQkFtQmhCLEtBQUs7O0lBZ0NWLHNCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0F2Q1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXInO1xuXG5sZXQgbGF5ZXJJZCA9IDA7XG5cbi8qXG4gKiBUaGlzIGRpcmVjdGl2ZSBhZGRzIGEgdHJhbnNpdCBsYXllciB0byBhIGdvb2dsZSBtYXAgaW5zdGFuY2VcbiAqIDxhZ20tdHJhbnNpdC1sYXllciBbdmlzaWJsZV09XCJ0cnVlfGZhbHNlXCI+IDxhZ20tdHJhbnNpdC1sYXllcj5cbiAqICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2FnbS10cmFuc2l0LWxheWVyJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBBZ21UcmFuc2l0TGF5ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95e1xuICAgIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XG5cbiAgICAvKipcbiAgICAgKiBIaWRlL3Nob3cgdHJhbnNpdCBsYXllclxuICAgICAqL1xuICAgIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgX21hbmFnZXI6IExheWVyTWFuYWdlciApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFuYWdlci5hZGRUcmFuc2l0TGF5ZXIodGhpcywge3Zpc2libGU6IHRoaXMudmlzaWJsZX0pO1xuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLnRvZ2dsZUxheWVyVmlzaWJpbGl0eSh0aGlzLCB7dmlzaWJsZTogY2hhbmdlc1sndmlzaWJsZSddLmN1cnJlbnRWYWx1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtVHJhbnNpdExheWVyLSR7dGhpcy5faWQudG9TdHJpbmcoKX1gOyB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlTGF5ZXIodGhpcyk7XG4gICAgfVxuXG59XG4iXX0=