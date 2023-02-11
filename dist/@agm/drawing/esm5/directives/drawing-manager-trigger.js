import { AgmMap } from '@agm/core';
import { Directive, Host, Input } from '@angular/core';
import { first } from 'rxjs/operators';
var AgmDrawingManagerTrigger = /** @class */ (function () {
    function AgmDrawingManagerTrigger(_agmMap) {
        this._agmMap = _agmMap;
    }
    AgmDrawingManagerTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function (map) { return _this.drawingManager.setMap(map); });
    };
    AgmDrawingManagerTrigger.prototype.ngOnDestroy = function () {
        var _this = this;
        this._agmMap.mapReady.pipe(first()).subscribe(function () { return _this.drawingManager.setMap(null); });
    };
    AgmDrawingManagerTrigger.ctorParameters = function () { return [
        { type: AgmMap, decorators: [{ type: Host }] }
    ]; };
    AgmDrawingManagerTrigger.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-map[agmDrawingManager]',
                    exportAs: 'matDrawingManagerTrigger',
                },] }
    ];
    AgmDrawingManagerTrigger.ctorParameters = function () { return [
        { type: AgmMap, decorators: [{ type: Host }] }
    ]; };
    AgmDrawingManagerTrigger.propDecorators = {
        drawingManager: [{ type: Input, args: ['agmDrawingManager',] }]
    };
    return AgmDrawingManagerTrigger;
}());
export { AgmDrawingManagerTrigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLXRyaWdnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2RyYXdpbmcvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2RyYXdpbmctbWFuYWdlci10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbkMsT0FBTyxFQUFpQixTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdkM7SUFVRSxrQ0FBNEIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFDM0MsQ0FBQztJQUVELGtEQUFlLEdBQWY7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELDhDQUFXLEdBQVg7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztJQUN4RixDQUFDOztnQkFUb0MsTUFBTSx1QkFBOUIsSUFBSTs7O2dCQVZsQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFLDBCQUEwQjtpQkFDckM7OztnQkFSUSxNQUFNLHVCQWVBLElBQUk7OztpQ0FGaEIsS0FBSyxTQUFDLG1CQUFtQjs7SUFZNUIsK0JBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQWhCWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ21NYXAgfSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFnbURyYXdpbmdNYW5hZ2VyIH0gZnJvbSAnLi9kcmF3aW5nLW1hbmFnZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tbWFwW2FnbURyYXdpbmdNYW5hZ2VyXScsXG4gIGV4cG9ydEFzOiAnbWF0RHJhd2luZ01hbmFnZXJUcmlnZ2VyJyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtRHJhd2luZ01hbmFnZXJUcmlnZ2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95e1xuXG4gIC8qKiBUaGUgZHJhd2luZyBtYW5hZ2VyIHRvIGJlIGF0dGFjaGVkIHRvIHRoaXMgdHJpZ2dlci4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdhZ21EcmF3aW5nTWFuYWdlcicpIGRyYXdpbmdNYW5hZ2VyOiBBZ21EcmF3aW5nTWFuYWdlcjtcblxuICBjb25zdHJ1Y3RvcihASG9zdCgpIHByaXZhdGUgX2FnbU1hcDogQWdtTWFwKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYWdtTWFwLm1hcFJlYWR5LnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKG1hcCA9PiB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE1hcChtYXApKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2FnbU1hcC5tYXBSZWFkeS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRyYXdpbmdNYW5hZ2VyLnNldE1hcChudWxsKSk7XG4gIH1cbn1cbiJdfQ==